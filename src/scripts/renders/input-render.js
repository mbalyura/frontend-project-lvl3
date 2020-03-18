import i18next from 'i18next';
import resources from '../locales';

export default ({ inputValidity, status, language }) => {
  const urlInput = document.querySelector('.url-input');
  const followButton = document.querySelector('.follow-button');
  i18next
    .init({ lng: language, debug: false, resources })
    .then((t) => {
      if (status === 'loading') {
        followButton.classList.add('disabled');
        followButton.value = t('input.loading');
      } else if (!inputValidity) {
        urlInput.classList.add('is-invalid');
        followButton.classList.add('disabled');
      } else {
        followButton.value = t('input.button');
        urlInput.classList.remove('is-invalid');
        followButton.classList.remove('disabled');
      }
    });
};
