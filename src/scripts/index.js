import { string } from 'yup';
import axios from 'axios';
import differenceWith from 'lodash/differenceWith';
import isEqual from 'lodash/isEqual';
import i18next from 'i18next';
import hash from 'short-hash';

import resources from './locales';
import parseRss from './parser';
import runWatchers from './watchers';
import renderLanguage from './renders/lang-render';

const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
// const corsProxyUrl = 'http://localhost:8080/';

const getParsedFeed = (feedUrl) => axios.get(`${corsProxyUrl}${feedUrl}`)
  .then(({ data }) => parseRss(data));

const getFeedUrls = (feeds) => feeds.map((feed) => feed.feedUrl);

const validateInput = (url, addedFeedUrls) => string()
  .url('url')
  .notOneOf(addedFeedUrls, 'double')
  .validate(url);

const updateInputValidity = (state) => {
  validateInput(state.form.value, getFeedUrls(state.feeds))
    .then(() => {
      state.form.error = null;
      state.form.validity = true;
    })
    .catch(({ message }) => {
      state.form.error = message;
      state.form.validity = false;
    });
};

const generateIdForFeed = (parsedFeed) => {
  const id = hash(parsedFeed.feedTitle);
  const posts = parsedFeed.posts.map((post) => ({ ...post, id }));
  return { ...parsedFeed, id, posts };
};

const updateStateWithNewFeed = (state, feedWithId, feedUrl) => {
  const {
    feedTitle, feedDescription, id, posts,
  } = feedWithId;
  const feed = {
    feedTitle, feedDescription, feedUrl, id,
  };
  state.feeds.push(feed);
  state.posts = [...posts, ...state.posts];
};

const getNewPostsInLoop = (state) => {
  Promise.all(getFeedUrls(state.feeds).map(getParsedFeed))
    .then((parsedFeeds) => {
      const feeds = parsedFeeds.map(generateIdForFeed);
      const newPosts = feeds
        .map((newFeed) => differenceWith(newFeed.posts, state.posts, isEqual))
        .flat();
      if (newPosts.length === 0) return;
      state.posts = [...newPosts, ...state.posts];
    });
  setTimeout(() => getNewPostsInLoop(state), 10000);
};

const app = () => {
  const state = {
    language: 'en',
    form: {
      value: '',
      validity: true,
      status: 'filling', // sending/failed
      error: null, // url/double/network
    },
    feeds: [],
    posts: [],
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
    state.form.status = 'filling';
    state.form.value = e.target.value;
    updateInputValidity(state);
  });

  rssForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const feedUrl = formData.get('url');
    if (feedUrl !== '') {
      state.form.status = 'sending';
      getParsedFeed(feedUrl)
        .then((parsedFeed) => {
          const feedWithId = generateIdForFeed(parsedFeed);
          updateStateWithNewFeed(state, feedWithId, feedUrl);
          state.form.status = 'filling';
        })
        .catch((err) => {
          console.error(err);
          state.form.status = 'failed';
          state.form.error = 'network';
        });
    }
  });
};

app();
