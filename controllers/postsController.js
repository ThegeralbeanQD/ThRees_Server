const Post = require("../models/Post");

const index = async (req, res) => {
    try {
        const posts = await Post.getAll();
        res.status(200).send(posts);
    } catch (err) {
        res.status(500).send({ "error": err.message });
    }
}

module.exports = { index }

