const { Router } = require("express");

const postsController = require("../controllers/postsController");

const postsRouter = Router();

postsRouter
    .route("/")
    .get(postsController.index)
    .post(postsController.create);

postsRouter
    .route("/:id")
    .get(postsController.show)
    .patch(postsController.update);

module.exports = postsRouter;
