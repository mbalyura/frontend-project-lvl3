// import 'bootstrap';
import '../styles/style.css';
import { string } from 'yup';
import axios from 'axios';
import _ from 'lodash';

import parser from './parser/parser';
import myWatch from './watchers';

const state = {
  language: '',
  inputValidity: true,
  feedUrls: [],
  feeds: {},
  newPosts: [],
  errors: [],
  status: '', // updated/pending
};

myWatch(state);

state.language = 'ru';


const urlInput = document.querySelector('.url-input');
const addRssButton = document.querySelector('.rss-add');
const langSwitcher = document.querySelector('.language');

// const corsUrl = 'https://cors-anywhere.herokuapp.com/';
const corsUrl = 'http://localhost:8080/';
const urlValidate = string().url();
const isDouble = (url) => state.feedUrls.includes(url);

const getParcedFeed = (feedUrl) => axios.get(`${corsUrl}${feedUrl}`)
  .then((response) => parser(response.data))
  .catch((error) => {
    console.log('getParcedFeed axios error!!! ', error);
    state.errors.push('network');
  });


const getNewPostsInLoop = () => {
  state.newPosts.forEach((post) => state.feeds[post.id].posts.unshift(post));
  state.newPosts = [];
  Promise.all(state.feedUrls.map(getParcedFeed))
    .then((parsedFeeds) => {
      const newPosts = parsedFeeds.map((newFeed) => {
        const oldFeed = state.feeds[newFeed.id];
        return _.differenceWith(newFeed.posts, oldFeed.posts, _.isEqual);
      }).flat().sort((a, b) => (a.title > b.title ? 1 : -1));
      state.newPosts = newPosts;
      console.log('state: ', state);
    });
  setTimeout(() => getNewPostsInLoop(), 5000);
};

langSwitcher.addEventListener('click', (e) => {
  e.preventDefault();
  const loop = { en: 'ru', ru: 'en' };
  state.language = loop[state.language];
});

urlInput.addEventListener('input', (e) => {
  const { value } = e.target;
  urlValidate.isValid(value).then((validity) => {
    state.inputValidity = validity && !isDouble(value);
  });
});

addRssButton.addEventListener('click', (e) => {
  e.preventDefault();
  const feedUrl = urlInput.value;
  if (state.inputValidity && feedUrl) {
    getParcedFeed(feedUrl)
      .then((parsedFeed) => {
        state.feeds[parsedFeed.id] = parsedFeed;
        state.feedUrls.push(feedUrl); // FIXME: change state.status ???
        setTimeout(getNewPostsInLoop, 5000);
      });
  }
});
