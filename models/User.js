const db = require('../database/connect');

class Users {

    constructor({ user_id, user_name, user_postcode, user_password, user_profile_pic }) {
        this.id = user_id;
        this.name = user_name;
        this.postcode = user_postcode;
        this.password = user_password;
        this.profile_pic = user_profile_pic;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM users ORDER BY user_name");
        return response.rows.map(u => new Users(u));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM users WHERE user_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.")
        }
        return new Users(response.rows[0]);
    }

    static async getByUsername(username) {
        const response = await db.query("SELECT * FROM users WHERE user_name = $1", [username]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.")
        }
        return new Users(response.rows[0]);
    }

    static async create(data) {
        const { name, postcode, password, profile_pic } = data;
        let response = await db.query("INSERT INTO users (user_name, user_postcode, user_password, user_profile_pic) VALUES ($1, $2, $3, $4) RETURNING user_id;",
            [name, postcode, password, profile_pic]);
        const newId = response.rows[0].user_id;
        const newUser = await Users.getOneById(newId);
        return newUser;
    }

    async update(data) {
        const { name, postcode, password, profile_pic } = data;
        const response = await db.query("UPDATE users SET user_name = $2, user_postcode = $3, user_password = $4, user_profile_pic = $5 WHERE user_id = $1 RETURNING *;", [this.id, name, postcode, password, profile_pic]);
        if (response.rows.length != 1) {
            throw new Error("Unable to update user.");
        }
        return new Users(response.rows[0]);
    }

    async destroy() {
        let response = await db.query("DELETE FROM users WHERE user_id = $1 RETURNING *;", [this.id]);
        return new Users(response.rows[0]);
    }

}

module.exports = Users;

