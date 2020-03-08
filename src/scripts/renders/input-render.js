
export default ({ inputValidity }) => {
  const urlInput = document.querySelector('.url-input');
  const addRssButton = document.querySelector('.rss-add');

  if (!inputValidity) {
    urlInput.classList.add('is-invalid');
    addRssButton.classList.add('disabled');
  } else {
    urlInput.classList.remove('is-invalid');
    addRssButton.classList.remove('disabled');
  }
};
