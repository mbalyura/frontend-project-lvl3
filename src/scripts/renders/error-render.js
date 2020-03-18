import i18next from 'i18next';

export default ({ error }) => {
  const errorContainer = document.querySelector('.error');
  if (!error) {
    errorContainer.innerText = '';
    return;
  }
  errorContainer.innerText = i18next.t(`errors.${error}`);
};
