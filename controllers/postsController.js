const Post = require("../models/Post");

const index = async (req, res) => {
    try {
        const posts = await Post.getAll();
        res.status(200).send(posts);
    } catch (err) {
        res.status(500).send({ "error": err.message });
    }
}

const show = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const post = await Post.findById(id);
        res.status(200).send(post);
    } catch (err) {
        res.status(404).send({ "error": err.message });
    }
}

module.exports = { index, show }

