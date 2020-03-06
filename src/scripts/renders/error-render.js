import i18next from 'i18next';
import resources from '../locales';

const errorContainer = document.querySelector('.error');

export default (errorName, lng) => {
  i18next
    .init({ lng, debug: false, resources })
    .then((t) => {
      console.log('error render');
      errorContainer.innerText = t(`errors.${errorName}`);
      errorContainer.classList.remove('invisible');
    });
};
