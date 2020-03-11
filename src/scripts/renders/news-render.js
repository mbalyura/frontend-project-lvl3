import i18next from 'i18next';
import resources from '../locales';

export default ({ newPostsBuffer, language }) => {
  const postsContainer = document.querySelector('.posts-container');
  const postsHeader = document.querySelector('.posts-header');

  i18next
    .init({ lng: language, debug: false, resources })
    .then((t) => {
      newPostsBuffer.forEach((post) => {
        const postContainer = document.getElementById(post.id);
        const postHead = document.createElement('h6');
        const postDescription = document.createElement('small');
        const link = document.createElement('a');

        postHead.innerText = post.title;
        postHead.classList.add('mt-2', 'mb-0');
        postDescription.innerText = post.description;
        link.innerText = t('output.readMore');
        link.classList.add('read-more');
        link.href = post.link;
        postContainer.prepend(postHead, postDescription, link);
      });
      postsContainer.prepend(postsHeader);
    });
};
