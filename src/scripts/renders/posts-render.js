import i18next from 'i18next';

export default (posts) => {
  const postsContainers = document.querySelectorAll('.posts-container');
  postsContainers.forEach((postsContainer) => {
    postsContainer.innerHTML = '';
  });

  posts.forEach((post) => {
    const postContainer = document.getElementById(post.id);
    const postHead = document.createElement('h6');
    const postDescription = document.createElement('small');
    const link = document.createElement('a');

    postHead.innerText = post.title;
    postHead.classList.add('mt-2', 'mb-0');
    postDescription.innerText = post.description;
    link.innerText = i18next.t('output.readMore');
    link.classList.add('read-more');
    link.href = post.link;
    postContainer.append(postHead, postDescription, link);
  });

  const postsContainer = document.querySelector('.posts-container');
  const postsHeader = document.createElement('h4');
  postsHeader.classList.add('posts-header', 'border-bottom');
  postsHeader.innerText = i18next.t('output.postsHeader');
  postsContainer.prepend(postsHeader);
};
