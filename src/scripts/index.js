import { string } from 'yup';
import axios from 'axios';
import _ from 'lodash';
import i18next from 'i18next';
import resources from './locales';
import parseRss from './parser';
import runWatchers from './watchers';

const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
// const corsProxyUrl = 'http://localhost:8080/';

const getParsedFeed = (feedUrl) => axios.get(`${corsProxyUrl}${feedUrl}`)
  .then(({ data }) => parseRss(data));

const validateInput = (state) => {
  const isUrlDouble = state.feedUrls.includes(state.form.value);
  const error = string().url().isValid(state.form.value).then((validity) => {
    if (!validity) return 'invalid';
    if (isUrlDouble) return 'double';
    return null;
  });
  return error;
};

const updateInputValidity = (state) => {
  validateInput(state).then((error) => {
    state.form.error = error;
    state.form.validity = !error;
  });
};

const app = () => {
  const state = {
    language: 'en',
    form: {
      value: '',
      validity: true,
      status: 'initial', // loading/loaded/failed
      error: null, // invalid/double/network
    },
    feeds: {},
    feedUrls: [],
    newPostsBuffer: [],
  };

  i18next.init({ lng: state.language, debug: false, resources })
    .then(() => runWatchers(state));

  const clearNewPostsBuffer = () => {
    state.newPostsBuffer.forEach((post) => {
      const targetFeed = state.feeds[post.id];
      targetFeed.posts.push(post);
    });
    state.newPostsBuffer = [];
  };

  const getNewPostsInLoop = () => {
    clearNewPostsBuffer();
    Promise.all(state.feedUrls.map(getParsedFeed))
      .then((parsedFeeds) => {
        const newPosts = parsedFeeds.map((newFeed) => {
          const oldFeed = state.feeds[newFeed.id];
          return _.differenceWith(newFeed.posts, oldFeed.posts, _.isEqual);
        }).flat().reverse();
        state.newPostsBuffer = newPosts;
      });
    setTimeout(getNewPostsInLoop, 10000);
  };

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
    if (state.form.validity && feedUrl !== '') {
      if (state.form.status === 'initial') {
        setTimeout(getNewPostsInLoop, 10000);
      }
      state.status = 'loading';
      getParsedFeed(feedUrl)
        .then((parsedFeed) => {
          state.feeds[parsedFeed.id] = parsedFeed;
          state.feedUrls.push(feedUrl);
          state.form.status = 'loaded';
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
