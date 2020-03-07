import i18next from 'i18next';
import resources from '../locales';

const errorContainer = document.querySelector('.error');

export default (error, lng) => {
  if (!error) {
    errorContainer.innerText = '';
    return;
  }
  i18next
    .init({ lng, debug: false, resources })
    .then((t) => {
      errorContainer.innerText = t(`errors.${error}`);
      errorContainer.classList.remove('invisible');
    });
};
