import { watch } from 'melanke-watchjs';
import i18next from 'i18next';

import renderLanguage from './renders/lang-render';
import renderInput from './renders/input-render';
import renderFeeds from './renders/feeds-render';
import renderPosts from './renders/posts-render';
import renderError from './renders/error-render';

export default (state) => {
  renderLanguage(state.form);

  watch(state, 'language', () => {
    i18next.changeLanguage(state.language)
      .then(renderLanguage(state.form));
  });

  watch(state.form, ['validity', 'status'], () => {
    renderInput(state.form);
  });

  watch(state, 'feedUrls', () => {
    renderFeeds(state.feeds);
    renderPosts(state.posts);
  });

  watch(state, 'newPostsBuffer', () => {
    if (state.newPostsBuffer.length !== 0) {
      renderPosts(state.newPostsBuffer);
    }
  });

  watch(state.form, 'error', () => {
    renderError(state.form);
  });
};
