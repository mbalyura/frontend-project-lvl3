// import 'bootstrap';
import '../styles/style.css';
import { string } from 'yup';
import axios from 'axios';
import parser from './parser/parser';
import myWatch from './watchers';

const state = {
  language: '',
  urlInputValidity: true,
  feedUrls: [],
  feeds: [],
  errors: [],
};

myWatch(state);

state.language = 'ru';


const urlInput = document.querySelector('.url-input');
const addRssButton = document.querySelector('.rss-add');
const langSwitcher = document.querySelector('.language');

const corsUrl = 'https://cors-anywhere.herokuapp.com/';
const urlValidate = string().url();
const isDouble = (url) => state.feedUrls.includes(url);

langSwitcher.addEventListener('click', (e) => {
  e.preventDefault();
  const loop = { en: 'ru', ru: 'en' };
  state.language = loop[state.language];
});

urlInput.addEventListener('input', (e) => {
  const { value } = e.target;
  urlValidate.isValid(value).then((validity) => {
    state.urlInputValidity = validity && !isDouble(value);
  });
});

addRssButton.addEventListener('click', (e) => {
  e.preventDefault();
  const feedUrl = urlInput.value;
  if (state.urlInputValidity && feedUrl) {
    state.feedUrls.push(feedUrl);
    axios.get(`${corsUrl}${feedUrl}`)
      .then((response) => {
        const parsedFeed = parser(response.data);
        state.feeds.push(parsedFeed);
      })
      .catch((error) => {
        console.log('axios get error!!! ', error);
        state.errors.push(error);
      });
  }
  console.log('state: ', state);
});
