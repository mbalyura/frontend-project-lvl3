import i18next from 'i18next';

export default ({ validity, status }) => {
  const urlInput = document.querySelector('.url-input');
  const followButton = document.querySelector('.follow-button');

  if (status === 'loading') {
    followButton.classList.add('disabled');
    followButton.value = i18next.t('input.loading');
  } else if (!validity) {
    urlInput.classList.add('is-invalid');
    followButton.classList.add('disabled');
  } else {
    followButton.value = i18next.t('input.button');
    urlInput.classList.remove('is-invalid');
    followButton.classList.remove('disabled');
  }
};
