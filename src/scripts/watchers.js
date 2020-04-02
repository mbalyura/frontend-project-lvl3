import { watch } from 'melanke-watchjs';
import i18next from 'i18next';

import renderLanguage from './renders/lang-render';
import renderForm from './renders/form-render';
import renderFeeds from './renders/feeds-render';
import renderPosts from './renders/posts-render';

export default (state) => {
  watch(state, 'language', () => {
    i18next.changeLanguage(state.language)
      .then(renderLanguage(state.form));
  });

  watch(state.form, ['validity', 'status', 'error'], () => {
    renderForm(state.form);
  });

  watch(state, 'feeds', () => {
    renderFeeds(state.feeds);
  });

  watch(state, 'posts', () => {
    renderPosts(state.posts);
  });
};
