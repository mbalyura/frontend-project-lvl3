import i18next from 'i18next';
import resources from '../locales';

const title = document.querySelector('.title');
const langSwitcher = document.querySelector('.language');
const urlInput = document.querySelector('.url-input');
const addRssButton = document.querySelector('.rss-add');

export default (lng) => {
  i18next
    .init({ lng, debug: true, resources })
    .then((t) => {
      urlInput.setAttribute('placeholder', t('input.placeholder'));
      addRssButton.innerText = t('input.button');
      langSwitcher.innerText = t('lang');
      title.innerText = t('mainHead');
      const links = document.querySelectorAll('.read-more');
      if (links.length !== 0) {
        links.forEach((link) => {
          // eslint-disable-next-line no-param-reassign
          link.innerText = t('output.readMore');
        });
      }
    });
};
