const outputContainer = document.querySelector('.output');

export default (feed) => {
  const row = document.createElement('div');
  row.classList.add('row');
  const feedsContainer = document.createElement('div');
  feedsContainer.classList.add('feeds-container', 'col-md-3');
  const postsContainer = document.createElement('div');
  postsContainer.classList.add('posts-container', 'col-md-9');

  const h5 = document.createElement('h5');
  const p = document.createElement('p');
  h5.innerText = feed.title;
  p.innerText = feed.description;
  feedsContainer.append(h5, p);

  feed.getPosts().forEach((post) => {
    const postElement = document.createElement('p');
    const link = document.createElement('a');
    link.innerText = post.title;
    link.href = post.link;
    postElement.append(link);
    postsContainer.append(postElement);
  });

  row.append(feedsContainer, postsContainer);
  outputContainer.append(row);
};
