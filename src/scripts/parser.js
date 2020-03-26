
export default (data) => {
  const domData = new DOMParser().parseFromString(data, 'text/xml');

  const feedTitle = domData.querySelector('title').textContent;
  const feedDescription = domData.querySelector('description').textContent;

  const postItems = domData.querySelectorAll('item');
  const posts = [...postItems].map((postItem) => {
    const title = postItem.querySelector('title').textContent;
    const description = postItem.querySelector('description')
      ? postItem.querySelector('description').textContent : '';
    const link = postItem.querySelector('link').textContent;
    const post = { title, description, link };
    return post;
  });

  const feed = {
    feedTitle, feedDescription, posts,
  };
  return feed;
};
