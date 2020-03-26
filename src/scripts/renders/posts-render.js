import i18next from 'i18next';

export default (posts) => {
  console.log('posts render');
  const postsContainer = document.querySelector('.posts-container');
  const postsHeader = document.querySelector('.posts-header');

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
  postsContainer.prepend(postsHeader);
};
