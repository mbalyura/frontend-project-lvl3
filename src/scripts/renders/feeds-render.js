import i18next from 'i18next';

export default (feeds) => {
  const outputContainer = document.querySelector('.output');
  // const urlInput = document.querySelector('.url-input');

  outputContainer.innerHTML = '';
  // urlInput.value = ''; // clear input

  const feedsHeader = document.createElement('h4');
  feedsHeader.classList.add('feeds-header', 'border-bottom');
  feedsHeader.innerText = i18next.t('output.feedsHeader');
  const postsHeader = document.createElement('h4');
  postsHeader.classList.add('posts-header', 'border-bottom');
  postsHeader.innerText = i18next.t('output.postsHeader');

  feeds.forEach((feed) => {
    const row = document.createElement('div');
    row.classList.add('row');
    const feedsContainer = document.createElement('div');
    feedsContainer.classList.add('feeds-container', 'col-md-3', 'border-right');

    const postsContainer = document.createElement('div');
    postsContainer.classList.add('posts-container', 'col-md-9');
    postsContainer.setAttribute('id', feed.id);

    const feedTitle = document.createElement('h5');
    const feedDescription = document.createElement('p');
    feedTitle.classList.add('mt-2');
    feedTitle.innerText = feed.feedTitle;
    feedDescription.innerText = feed.feedDescription;
    feedsContainer.append(feedTitle, feedDescription);

    feedsContainer.prepend(feedsHeader);
    postsContainer.prepend(postsHeader);
    row.append(feedsContainer, postsContainer);
    outputContainer.prepend(row);
    outputContainer.classList.remove('invisible');
  });
};
