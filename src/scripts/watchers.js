import { watch } from 'melanke-watchjs';
import renderInput from './renders/input-render';
import renderFeeds from './renders/feeds-render';
import renderLanguage from './renders/lang-render';
import renderError from './renders/error-render';
import renderNewPosts from './renders/news-render';

export default (state) => {
  watch(state, 'language', () => {
    renderLanguage(state);
  });

  watch(state, ['inputValidity', 'status'], () => {
    renderInput(state);
  });

  watch(state, 'feedUrls', () => {
    renderFeeds(state);
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
