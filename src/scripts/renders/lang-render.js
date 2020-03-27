import i18next from 'i18next';

export default ({ error }) => {
  const title = document.querySelector('.title');
  const langSwitcher = document.querySelector('.language-button');
  const urlInput = document.querySelector('.url-input');
  const followButton = document.querySelector('.follow-button');
  const errorContainer = document.querySelector('.error');
  const feedsHeader = document.querySelector('.feeds-header');
  const postsHeader = document.querySelector('.posts-header');

  urlInput.setAttribute('placeholder', i18next.t('input.placeholder'));
  followButton.value = i18next.t('input.button');
  langSwitcher.innerText = i18next.t('lang');
  title.innerText = i18next.t('mainHead');
  errorContainer.innerText = error ? i18next.t(`errors.${error}`) : '';
  if (feedsHeader) feedsHeader.innerText = i18next.t('output.feedsHeader');
  if (postsHeader) postsHeader.innerText = i18next.t('output.postsHeader');

  const links = document.querySelectorAll('.read-more');
  if (links.length !== 0) {
    links.forEach((link) => {
      link.innerText = i18next.t('output.readMore');
    });
  }
};
