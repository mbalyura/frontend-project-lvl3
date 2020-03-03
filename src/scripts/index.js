// import 'bootstrap';
import '../styles/style.css';
import { string } from 'yup';
import watch from './watchers';

const state = {
  language: '',
  feedUrls: [],
  urlInputValidity: true,
};

watch(state);

state.language = 'ru';

const urlInput = document.querySelector('.url-input');
const addRssButton = document.querySelector('.rss-add');
const langSwitcher = document.querySelector('.language');
const urlValidate = string().url();

langSwitcher.addEventListener('click', (e) => {
  e.preventDefault();
  const swithLoop = { en: 'ru', ru: 'en' };
  state.language = swithLoop[state.language];
});

urlInput.addEventListener('input', (e) => {
  const { value } = e.target;
  const isDouble = state.feedUrls.includes(value);
  urlValidate.isValid(value).then((validity) => {
    state.urlInputValidity = validity && !isDouble;
  });
});

addRssButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (state.urlInputValidity) {
    state.feedUrls.push(urlInput.value);
  }
});
