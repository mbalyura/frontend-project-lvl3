import _ from 'lodash';
import Feed from './Feed';

export default (data) => {
  const domParser = new DOMParser().parseFromString.bind(new DOMParser());
  const parsedResponse = domParser(data, 'text/xml');

  const feedTitle = parsedResponse.querySelector('title').textContent;
  const feedDescription = parsedResponse.querySelector('description').textContent;
  const feedId = _.uniqueId();

  const feed = new Feed(feedTitle, feedDescription, feedId);

  const postItems = parsedResponse.querySelectorAll('item');
  postItems.forEach((postItem) => {
    const title = postItem.querySelector('title').textContent;
    const link = postItem.querySelector('link').textContent;
    feed.addPost({ feedId, title, link });
  });
  return feed;
};
