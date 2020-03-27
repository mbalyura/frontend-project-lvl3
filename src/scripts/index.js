import { string } from 'yup';
import axios from 'axios';
import _ from 'lodash';
import i18next from 'i18next';
import hash from 'short-hash';

import resources from './locales';
import parseRss from './parser';
import runWatchers from './watchers';
import renderLanguage from './renders/lang-render';

// const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
const corsProxyUrl = 'http://localhost:8080/';

const getParsedFeed = (feedUrl) => axios.get(`${corsProxyUrl}${feedUrl}`)
  .then(({ data }) => parseRss(data));

const validateInput = (state) => string()
  .url()
  .test('double', (url) => !state.feedUrls.includes(url))
  .validate(state.form.value);

const updateInputValidity = (state) => {
  validateInput(state)
    .then(() => {
      state.form.error = null;
    })
    .catch(({ type }) => {
      state.form.error = type;
    })
    .finally(() => {
      state.form.validity = !state.form.error;
    });
};

const generateIdForFeed = (parsedFeed) => {
  const id = hash(parsedFeed.feedTitle);
  const posts = parsedFeed.posts.map((post) => ({ ...post, id }));
  return { ...parsedFeed, id, posts };
};

const updateStateWithNewFeed = (state, feedWithId, feedUrl) => {
  state.feedUrls.push(feedUrl);
  const {
    feedTitle, feedDescription, id, posts,
  } = feedWithId;
  const feed = { feedTitle, feedDescription, id };
  state.feeds.push(feed);
  state.posts = [...posts.reverse(), ...state.posts];
};

const getNewPostsInLoop = (state) => {
  Promise.all(state.feedUrls.map(getParsedFeed))
    .then((parsedFeeds) => {
      const feeds = parsedFeeds.map(generateIdForFeed);
      const newPosts = feeds
        .map((newFeed) => _.differenceWith(newFeed.posts, state.posts, _.isEqual))
        .flat().reverse();
      state.newPostsBuffer = newPosts;
      state.posts = [...state.posts, ...newPosts];
    });
  setTimeout(() => getNewPostsInLoop(state), 10000);
};

const app = () => {
  const state = {
    language: 'en',
    form: {
      value: '',
      validity: true,
      status: 'filling', // loading
      error: null, // url/double/network
    },
    feedUrls: [],
    feeds: [],
    posts: [],
    newPostsBuffer: [],
  };

  i18next.init({ lng: state.language, debug: false, resources })
    .then(() => {
      runWatchers(state);
      renderLanguage(state.form);
      setTimeout(() => getNewPostsInLoop(state), 10000);
    });

  const langSwitcher = document.querySelector('.language-button');
  const urlInput = document.querySelector('.url-input');
  const rssForm = document.querySelector('.rss-form');

  langSwitcher.addEventListener('click', (e) => {
    e.preventDefault();
    const loop = { en: 'ru', ru: 'en' };
    state.language = loop[state.language];
  });

  urlInput.addEventListener('input', (e) => {
    state.form.value = e.target.value;
    updateInputValidity(state);
  });

  rssForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const feedUrl = formData.get('url');
    if (feedUrl !== '') {
      state.form.status = 'loading';
      getParsedFeed(feedUrl)
        .then((parsedFeed) => {
          const feedWithId = generateIdForFeed(parsedFeed);
          updateStateWithNewFeed(state, feedWithId, feedUrl);
        })
        .catch((err) => {
          console.error(err);
          state.form.error = 'network';
        })
        .finally(() => {
          state.form.status = 'filling';
        });
    }
  });
};

app();
