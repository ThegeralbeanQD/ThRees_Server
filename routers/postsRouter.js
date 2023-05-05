const { Router } = require("express");

const postsController = require("../controllers/postsController");

const postsRouter = Router();

postsRouter
    .route("/")
    .get(postsController.index);

postsRouter
    .route("/:id")
    .get(postsController.show);

module.exports = postsRouter;
