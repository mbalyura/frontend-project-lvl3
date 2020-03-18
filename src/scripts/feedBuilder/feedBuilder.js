import hash from 'short-hash';
import Feed from './Feed';
import Post from './Post';

export default (domData) => {
console.log("domData", domData)
  const feedTitle = domData.querySelector('title').textContent;
  const feedDescription = domData.querySelector('description').textContent;
  const feedId = hash(feedTitle);

  const feed = new Feed(feedTitle, feedDescription, feedId);

  const postItems = domData.querySelectorAll('item');
  postItems.forEach((postItem) => {
    const title = postItem.querySelector('title').textContent;
    const link = postItem.querySelector('link').textContent;
    const description = postItem.querySelector('description')
      ? postItem.querySelector('description').textContent : '';
    const currentPost = new Post(title, link, description, feedId);
    feed.addPost(currentPost);
  });

  return feed;
};
