import { string } from 'yup';
import axios from 'axios';
import _ from 'lodash';
import parseToDom from './parser';
import buildFeed from './feedBuilder/feedBuilder';
import runWatchers from './watchers';

const app = () => {
  const state = {
    language: '',
    status: 'initial', // loading/loaded/failed
    inputValidity: true,
    feeds: {},
    feedUrls: [],
    newPostsBuffer: [],
    error: null, // invalid/double/network
  };

  runWatchers(state);

  state.language = 'en';

  const rssForm = document.querySelector('.rss-form');
  const urlInput = document.querySelector('.url-input');
  const langSwitcher = document.querySelector('.language-button');

  // const corsUrl = 'https://cors-anywhere.herokuapp.com/';
  const corsUrl = 'http://localhost:8080/';

  const urlValidate = (url) => string().url().isValid(url);

  const isUrlDouble = (url) => state.feedUrls.includes(url);

  const getParsedFeed = (feedUrl) => axios.get(`${corsUrl}${feedUrl}`)
    .then(({ data }) => parseToDom(data))
    .then((domData) => buildFeed(domData));

  const clearNewPostsBuffer = () => {
    state.newPostsBuffer.forEach((post) => state.feeds[post.id].addPost(post));
    state.newPostsBuffer = [];
  };

  const getNewPostsInLoop = () => {
    clearNewPostsBuffer();
    Promise.all(state.feedUrls.map(getParsedFeed))
      .then((parsedFeeds) => {
        const newPosts = parsedFeeds.map((newFeed) => {
          const oldFeed = state.feeds[newFeed.id];
          return _.differenceWith(newFeed.getPosts(), oldFeed.getPosts(), _.isEqual);
        }).flat().reverse();
        state.newPostsBuffer = newPosts;
      });
    setTimeout(getNewPostsInLoop, 10000);
  };

  langSwitcher.addEventListener('click', (e) => {
    e.preventDefault();
    const loop = { en: 'ru', ru: 'en' };
    state.language = loop[state.language];
  });

  urlInput.addEventListener('input', (e) => {
    state.error = null;
    const { value } = e.target;
    if (isUrlDouble(value)) state.error = 'double';
    urlValidate(value).then((validity) => {
      if (!validity) state.error = 'invalid';
      state.inputValidity = validity && !isUrlDouble(value);
    });
  });

  rssForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const feedUrl = formData.get('url');
    if (state.inputValidity && feedUrl) {
      if (state.status === 'initial') {
        setTimeout(getNewPostsInLoop, 10000);
      }
      state.status = 'loading';
      getParsedFeed(feedUrl)
        .then((parsedFeed) => {
          state.feeds[parsedFeed.id] = parsedFeed;
          state.feedUrls.push(feedUrl);
          state.status = 'loaded';
        })
        .catch((err) => {
          console.error(err);
          state.status = 'failed';
          state.error = 'network';
        });
    }
  });
};

app();
