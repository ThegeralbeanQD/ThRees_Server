const { Router } = require("express");

const postsController = require("../controllers/postsController");

const postRouter = Router();

postRouter
    .route("/")
    .get("/", postsController.index);


module.exports = postRouter;
