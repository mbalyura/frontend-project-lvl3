import { watch } from 'melanke-watchjs';
import renderInput from './renders/input-render';
import renderFeed from './renders/feed-render';
import renderLanguage from './renders/lang-render';
import renderError from './renders/error-render';
import renderNewPosts from './renders/news-render';

const outputContainer = document.querySelector('.output');
const urlInput = document.querySelector('.url-input');

export default (state) => {
  watch(state, 'language', () => {
    renderLanguage(state);
  });

  watch(state, 'inputValidity', () => {
    renderInput(state);
  });

  watch(state, 'feedUrls', () => { // TODO: watching for status maybe???
    urlInput.value = ''; // clear input
    outputContainer.innerHTML = '';
    Object.values(state.feeds).forEach((feed) => {
      renderFeed(feed, state.language);
    });
  });

  watch(state, 'newPostsBuffer', () => {
    if (state.newPostsBuffer.length !== 0) {
      renderNewPosts(state);
    }
  });

  watch(state, 'error', () => {
    renderError(state);
  });
};
