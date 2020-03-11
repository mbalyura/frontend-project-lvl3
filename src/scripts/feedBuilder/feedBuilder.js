import hash from 'short-hash';
import Feed from './Feed';
import Post from './Post';
import parser from '../parser';

export default (data) => {
  const parsedResponse = parser(data);
  const feedTitle = parsedResponse.querySelector('title').textContent;
  const feedDescription = parsedResponse.querySelector('description').textContent;
  const feedId = hash(feedTitle);

  const feed = new Feed(feedTitle, feedDescription, feedId);

  const postItems = parsedResponse.querySelectorAll('item');
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
