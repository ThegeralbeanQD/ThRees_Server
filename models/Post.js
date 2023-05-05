const db = require("../database/connect");

class Post {
    constructor({ post_id, post_title, post_content, post_image, post_date, post_time, post_user_id }) {
        this.id = post_id
        this.title = post_title
        this.content = post_content
        this.image = post_image
        this.date = post_date
        this.time = post_time
        this.user_id = post_user_id
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM posts");
        if (response.rows.length === 0) {
            throw new Error("No posts found.")
        }
        return response.rows.map(p => new Post(p));
    }

}

module.exports = Post;
