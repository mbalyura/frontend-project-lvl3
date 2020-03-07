import { watch } from 'melanke-watchjs';
import renderInput from './renders/input-render';
import renderFeed from './renders/feed-render';
import renderLanguage from './renders/lang-render';
import renderError from './renders/error-render';
import renderNewPosts from './renders/news-render';

const outputContainer = document.querySelector('.output');

export default (state) => {
  watch(state, 'language', () => {
    renderLanguage(state);
  });

  watch(state, 'inputValidity', () => {
    renderInput(state);
  });

  watch(state, 'feedUrls', () => { // TODO: watching for status maybe???
    // console.log('!!!!state: ', state);
    // urlInput.value = ''; // clear input
    outputContainer.innerHTML = '';
    Object.values(state.feeds).forEach((feed) => {
      renderFeed(feed, state.language);
    });
  });

  watch(state, 'newPosts', () => {
    if (state.newPosts.length) {
      renderNewPosts(state.newPosts, state.language);
    }
  });

  watch(state, 'error', () => {
    renderError(state.error, state.language);
  });
};
