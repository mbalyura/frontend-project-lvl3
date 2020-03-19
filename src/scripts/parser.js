import hash from 'short-hash';

export default (data) => {
  const domData = new DOMParser().parseFromString(data, 'text/xml');

  const feedTitle = domData.querySelector('title').textContent;
  const feedDescription = domData.querySelector('description').textContent;
  const feedId = hash(feedTitle);

  const postItems = domData.querySelectorAll('item');
  const posts = [...postItems].map((postItem) => {
    const title = postItem.querySelector('title').textContent;
    const link = postItem.querySelector('link').textContent;
    const description = postItem.querySelector('description')
      ? postItem.querySelector('description').textContent : '';
    const post = {
      title, description, link, id: feedId,
    };
    return post;
  });

  const feed = {
    title: feedTitle, description: feedDescription, id: feedId, posts,
  };
  return feed;
};
