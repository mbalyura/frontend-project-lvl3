import i18next from 'i18next';

export default ({ feeds }) => {
  const outputContainer = document.querySelector('.output');
  const urlInput = document.querySelector('.url-input');

  outputContainer.innerHTML = '';
  urlInput.value = ''; // clear input

  const feedsHeader = document.createElement('h4');
  feedsHeader.classList.add('feeds-header', 'border-bottom');
  feedsHeader.innerText = i18next.t('output.feedsHeader');
  const postsHeader = document.createElement('h4');
  postsHeader.classList.add('posts-header', 'border-bottom');
  postsHeader.innerText = i18next.t('output.postsHeader');

  Object.values(feeds).forEach((feed) => {
    const row = document.createElement('div');
    row.classList.add('row');
    const feedsContainer = document.createElement('div');
    feedsContainer.classList.add('feeds-container', 'col-md-3', 'border-right');

    const postsContainer = document.createElement('div');
    postsContainer.classList.add('posts-container', 'col-md-9');
    postsContainer.setAttribute('id', feed.id);

    const feedHead = document.createElement('h5');
    const feedDescription = document.createElement('p');
    feedHead.classList.add('mt-2');
    feedHead.innerText = feed.title;
    feedDescription.innerText = feed.description;
    feedsContainer.append(feedHead, feedDescription);

    feed.getPosts().forEach((post) => {
      const postHead = document.createElement('h6');
      const postDescription = document.createElement('small');
      const link = document.createElement('a');
      link.classList.add('read-more');
      postHead.innerText = post.title;
      postHead.classList.add('mt-2', 'mb-0');
      postDescription.innerText = post.description;
      link.innerText = i18next.t('output.readMore');
      link.href = post.link;
      postsContainer.append(postHead, postDescription, link);
    });

    feedsContainer.prepend(feedsHeader);
    postsContainer.prepend(postsHeader);
    row.append(feedsContainer, postsContainer);
    outputContainer.prepend(row);
    outputContainer.classList.remove('invisible');
  });
};
