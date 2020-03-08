import i18next from 'i18next';
import resources from '../locales';


export default ({ error, language }) => {
  const errorContainer = document.querySelector('.error');

  if (!error) {
    errorContainer.innerText = '';
    return;
  }

  i18next
    .init({ lng: language, debug: false, resources })
    .then((t) => {
      errorContainer.innerText = t(`errors.${error}`);
      errorContainer.classList.remove('invisible');
    });
};
