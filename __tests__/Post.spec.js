require('dotenv').config();
const Post = require("../models/Post");

describe("Post Model", () => {
  it("is defined", () => {
    expect(Post).toBeDefined()
  })

  it("Post.all exists", () => {
    const Posts = Post.getAll();
    expect(Posts).toBeDefined();
  })

  it("gets all posts", async () => {
    const posts = await Post.getAll();
    expect(posts.length).toBeGreaterThan(0);
  })

  it("gets one by id", async () => {
    const posts = await Post.findById(1);
    expect(posts.id).toBe(1);
  })

  it("finds by category", async () => {
    const posts = await Post.findByCategory("Environment");
    posts.forEach(post => {
      expect(post.category).toBe("Environment");
    })
  })
})
