import 'bootstrap';
import '../styles/style.css';
import { string } from 'yup';
import axios from 'axios';
import _ from 'lodash';

import parser from './parser/parser';
import myWatch from './watchers';

const state = {
  language: '',
  inputValidity: true,
  feeds: {},
  feedUrls: [],
  newPostsBuffer: [],
  error: null,
  status: 'init', // updated/pending
};

myWatch(state);

state.language = 'en';

const urlInput = document.querySelector('.url-input');
const addRssButton = document.querySelector('.rss-add');
const langSwitcher = document.querySelector('.language');

// const corsUrl = 'https://cors-anywhere.herokuapp.com/';
const corsUrl = 'http://localhost:8080/';

const urlValidate = (url) => string().url().isValid(url)
  .then((isUrl) => isUrl && !state.feedUrls.includes(url));

const getParsedFeed = (feedUrl) => axios.get(`${corsUrl}${feedUrl}`)
  .then((response) => parser(response.data));

const clearNewPostsBuffer = () => {
  state.newPostsBuffer.forEach((post) => state.feeds[post.id].addPost(post));
  state.newPostsBuffer = [];
};

const getNewPostsInLoop = () => {
  console.log('start loop!!!');
  clearNewPostsBuffer();
  Promise.all(state.feedUrls.map(getParsedFeed))
    .then((parsedFeeds) => {
      const newPosts = parsedFeeds.map((newFeed) => {
        const oldFeed = state.feeds[newFeed.id];
        return _.differenceWith(newFeed.getPosts(), oldFeed.getPosts(), _.isEqual);
      }).flat().reverse();
      state.newPostsBuffer = newPosts;
      console.log('end loop!!!');
    });
  setTimeout(() => getNewPostsInLoop(), 10000);
};

langSwitcher.addEventListener('click', (e) => {
  e.preventDefault();
  const loop = { en: 'ru', ru: 'en' };
  state.language = loop[state.language];
});

urlInput.addEventListener('input', (e) => {
  state.error = null;
  const { value } = e.target;
  urlValidate(value).then((validity) => {
    if (!validity) state.error = 'invalid';
    state.inputValidity = validity;
  });
});

addRssButton.addEventListener('click', (e) => {
  e.preventDefault();
  const feedUrl = urlInput.value;
  if (state.inputValidity && feedUrl) {
    console.log('loading');
    getParsedFeed(feedUrl)
      .then((parsedFeed) => {
        state.feeds[parsedFeed.id] = parsedFeed;
        state.feedUrls.push(feedUrl);
        if (state.status === 'init') {
          getNewPostsInLoop();
          state.status = 'loaded';
          console.log('loaded');
        }
      })
      .catch((err) => {
        console.error(err);
        state.error = 'network';
      });
  }
});
