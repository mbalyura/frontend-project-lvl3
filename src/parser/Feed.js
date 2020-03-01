export default class Feed {
  constructor(title, description, id, posts = []) {
    this.title = title;
    this.description = description;
    this.id = id;
    this.posts = posts;
  }

  addPost(post) {
    this.posts.push(post);
  }

  getPosts() {
    return this.posts;
  }
}
