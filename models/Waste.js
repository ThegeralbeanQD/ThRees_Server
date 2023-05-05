const db = require('../database/connect');

class Waste {
    constructor({waste_id, waste_postcode}){
        this.id = waste_id
        this.postcode = waste_postcode
    }

    static async getAll() {
        const response = await db.query("SELECT COUNT(*) FROM waste");
        return parseInt(response.rows[0].count)
    }

    // static async getOneById(id) {
    //     const response = await db.query("SELECT * FROM diaries WHERE postId = $1", [id]);
    //     if (response.rows.length != 1) {
    //         throw new Error("Unable to locate entry.")
    //     }
    //     return new Post(response.rows[0]);
    // }

    // static async create(data) {
    //     const { title, content, category, mood } = data;
    //     let response = await db.query("INSERT INTO diaries (title, content, category, mood) VALUES ($1, $2, $3, $4) RETURNING *;",
    //         [title, content, category, mood]);
    //     const newId = response.rows[0].postId;
    //     const newPost = await Diary.getOneById(newId);
    //     return newPost;
    // }

    // static async destroy(data) {
    //     console.log(data);
    //     const response = await db.query('DELETE FROM diaries WHERE snack_id = $1 RETURNING *;', [data.id]);
    //     if (response.rows.length != 1) {
    //         throw new Error("Unable to delete entry.")
    //     }
    //     return new Snack(response.rows[0]);
    // }
}

module.exports = Waste