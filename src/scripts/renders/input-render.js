import i18next from 'i18next';
import resources from '../locales';

export default ({ inputValidity, status, language }) => {
  const urlInput = document.querySelector('.url-input');
  const addRssButton = document.querySelector('.rss-add');
  i18next
    .init({ lng: language, debug: false, resources })
    .then((t) => {
      if (status === 'loading') {
        addRssButton.classList.add('disabled');
        addRssButton.innerText = t('input.loading');
      } else if (!inputValidity) {
        urlInput.classList.add('is-invalid');
        addRssButton.classList.add('disabled');
      } else {
        addRssButton.innerText = t('input.button');
        urlInput.classList.remove('is-invalid');
        addRssButton.classList.remove('disabled');
      }
    });
};
