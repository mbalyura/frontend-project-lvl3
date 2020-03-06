import i18next from 'i18next';
import resources from '../locales';

const outputContainer = document.querySelector('.output');

export default (feed, lng) => {
  i18next
    .init({ lng, debug: false, resources })
    .then((t) => {
      const row = document.createElement('div');
      row.classList.add('row');
      const feedsContainer = document.createElement('div');
      feedsContainer.classList.add('feeds-container', 'col-md-3', 'border-right', 'border-dark');
      // feedsContainer.setAttribute('id', feed.id);

      const postsContainer = document.createElement('div');
      postsContainer.classList.add('posts-container', 'col-md-9');
      postsContainer.setAttribute('id', feed.id);

      const feedHead = document.createElement('h4');
      const feedDescription = document.createElement('p');
      feedHead.innerText = feed.title;
      feedDescription.innerText = feed.description;
      feedsContainer.append(feedHead, feedDescription);

      feed.getPosts().forEach((post) => {
        const postHead = document.createElement('h5');
        const postDescription = document.createElement('span');
        const link = document.createElement('a');
        link.classList.add('read-more');
        postHead.innerText = post.title;
        postDescription.innerText = post.description;
        link.innerText = t('output.readMore');
        link.href = post.link;
        postsContainer.append(postHead, postDescription, link);
      });

      row.append(feedsContainer, postsContainer);
      outputContainer.append(row);
      outputContainer.classList.remove('invisible');
    });
};
