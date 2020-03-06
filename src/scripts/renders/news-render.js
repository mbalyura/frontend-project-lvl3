import i18next from 'i18next';
import resources from '../locales';

export default (posts, lng) => {
  i18next
    .init({ lng, debug: false, resources })
    .then((t) => {
      posts.forEach((post) => {
        const postContainer = document.getElementById(post.id);
        const postHead = document.createElement('h5');
        const postDescription = document.createElement('span');
        const link = document.createElement('a');
        link.classList.add('read-more');
        postHead.innerText = post.title;
        postDescription.innerText = post.description;
        link.innerText = t('output.readMore');
        link.href = post.link;
        postContainer.prepend(postHead, postDescription, link);
      });
    });
};
