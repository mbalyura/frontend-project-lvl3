import i18next from 'i18next';

export default ({ validity, status, error }) => {
  const urlInput = document.querySelector('.url-input');
  const followButton = document.querySelector('.follow-button');
  const errorContainer = document.querySelector('.error');

  const spinner = document.createElement('span');
  spinner.classList.add('ml-2', 'spinner-border-sm', 'spinner-border');

  switch (status) {
    case 'filling':
      followButton.innerText = i18next.t('input.button');
      urlInput.classList.remove('is-invalid');
      followButton.disabled = false;
      errorContainer.innerText = '';
      if (!validity) {
        urlInput.classList.add('is-invalid');
        followButton.disabled = true;
        errorContainer.innerText = i18next.t(`errors.${error}`);
      }
      break;
    case 'sending':
      followButton.innerText = i18next.t('input.loading');
      followButton.append(spinner);
      followButton.disabled = true;
      break;
    case 'failed':
      followButton.innerText = i18next.t('input.button');
      followButton.disabled = false;
      errorContainer.innerText = i18next.t(`errors.${error}`);
      break;
    default:
      throw new Error(`Wrong status: ${status}`);
  }
};
