const db = require("../database/connect");

class Post {
    constructor({ post_id, post_title, post_content, post_category, post_image, post_time, post_date, post_user_id }) {
        this.id = post_id
        this.title = post_title
        this.content = post_content
        this.category = post_category
        this.image = post_image
        this.time = post_time
        this.date = post_date
        this.user_id = post_user_id
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM posts");
        if (response.rows.length === 0) {
            throw new Error("No posts found.")
        }
        return response.rows.map(p => new Post(p));
    }

    static async findById(id) {
        const response = await db.query("SELECT * FROM posts WHERE post_id = $1;", [id]);
        if (response.rows.length != 1) {
            throw new Error("Cannot find post.");
        }
        return new Post(response.rows[0]);
    }

    static async findByCategory(category) {
        const response = await db.query("SELECT * FROM posts WHERE post_category = $1", [category]);
        if (response.rows.length === 0) {
            throw new Error("Cannot find category.");
        }
        return response.rows.map(p => new Post(p));
    }

    static async create(data) {
        const { post_title, post_content, post_category, buffer } = data;
        const exists = await db.query("SELECT * FROM posts WHERE post_title = $1", [post_title]);
        if (!exists.rows[0]) {
            const response = await db.query("INSERT INTO posts (post_title, post_content, post_category, post_image) VALUES ($1, $2, $3, $4) RETURNING *;", [post_title, post_content, post_category, buffer]);
            const postId = response.rows[0].post_id;
            const newPost = await Post.findById(postId);
            return newPost;
        } else {
            throw new Error("A post with this title already exists.");
        }
    }

    async update(data) {
        const { post_title, post_content, post_category, post_image } = data;
        const response = await db.query("UPDATE posts SET post_title = $1, post_content = $2, post_category = $3, post_image = $4 WHERE post_id = $5 RETURNING post_title, post_content, post_category, post_image;", [post_title, post_content, post_category, post_image, this.id]);
        if (response.rows.length != 1) {
            throw new Error("Cannot update post.")
        }
        return new Post(response.rows[0]);
    }

    async destroy() {
        const response = await db.query("DELETE FROM posts WHERE post_id = $1 RETURNING *;", [this.id]);
        if (response.rows.length != 1) {
            throw new Error("Cannot delete post.");
        }
        return new Post(response.rows[0]);
    }
}

module.exports = Post;
