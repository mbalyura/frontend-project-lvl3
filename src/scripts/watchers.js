import { watch } from 'melanke-watchjs';
import renderFeed from './renders/feed-render';
import renderPage from './renders/page-render';
import renderError from './renders/error-render';


const urlInput = document.querySelector('.url-input');
const addRssButton = document.querySelector('.rss-add');
const outputContainer = document.querySelector('.output');
const errorContainer = document.querySelector('.error');

export default (state) => {
  watch(state, 'language', () => {
    renderPage(state.language);
  });

  watch(state, 'urlInputValidity', () => {
    if (!state.urlInputValidity) {
      console.log('watch inputvalidity !input is not valid!');
      urlInput.classList.add('is-invalid');
      addRssButton.classList.add('disabled');
    } else {
      urlInput.classList.remove('is-invalid');
      addRssButton.classList.remove('disabled');
    }
  });

  watch(state, 'feeds', () => {
    urlInput.value = ''; // clear input
    outputContainer.innerHTML = '';

    state.feeds.forEach((feed) => {
      renderFeed(feed, state.language);
    });
  });

  watch(state, 'errors', () => {
    errorContainer.innerHTML = '';

    state.errors.forEach((feed) => {
      renderError(feed, state.language);
    });
  });
};
