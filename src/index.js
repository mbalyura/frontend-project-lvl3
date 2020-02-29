import 'bootstrap';
import './style.css';
import { string } from 'yup';
import watch from './watchers';

const state = {
  feeds: [],
  urlInputValidity: true,
};

watch(state);

const urlInput = document.querySelector('.url-input');
const addRssButton = document.querySelector('.rss-add');
const urlValidate = string().url();

urlInput.addEventListener('input', (e) => {
  const { value } = e.target;
  const isDouble = state.feeds.includes(value);
  urlValidate.isValid(value).then((validity) => {
    state.urlInputValidity = validity && !isDouble;
  });
});

addRssButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (state.urlInputValidity) {
    state.feeds.push(urlInput.value);
  }
});
