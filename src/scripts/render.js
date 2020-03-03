import i18next from 'i18next';
import en from './locales/en.js';

const outputContainer = document.querySelector('.output');

export default (feed) => {
  // i18next
  // .init({ /* options */ )})
  // .then(function(t) { t('key'); });

  const row = document.createElement('div');
  row.classList.add('row');
  const feedsContainer = document.createElement('div');
  feedsContainer.classList.add('feeds-container', 'col-md-3');
  const postsContainer = document.createElement('div');
  postsContainer.classList.add('posts-container', 'col-md-9');

  const feedHead = document.createElement('h4');
  const feedDescription = document.createElement('p');
  feedHead.innerText = feed.title;
  feedDescription.innerText = feed.description;
  feedsContainer.append(feedHead, feedDescription);

  feed.getPosts().forEach((post) => {
    const postHead = document.createElement('h5');
    const postDescription = document.createElement('p');
    const link = document.createElement('a');
    postHead.innerText = post.title;
    postDescription.innerText = post.description;
    link.innerText = 'read more...';
    link.href = post.link;
    // postElement.append(link);
    postsContainer.append(postHead, postDescription, link);
  });

  row.append(feedsContainer, postsContainer);
  outputContainer.append(row);
};
