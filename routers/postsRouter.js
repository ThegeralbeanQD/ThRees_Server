const { Router } = require("express");
const upload = require("../middleware/upload");

const postsController = require("../controllers/postsController");

const postsRouter = Router();

postsRouter
    .route("/")
    .get(postsController.index)
    .post(upload, postsController.create);

postsRouter
    .route("/:id")
    .get(postsController.show)
    .patch(postsController.update)
    .delete(postsController.destroy);

postsRouter
    .route("/search/:category")
    .get(postsController.showCategory);


module.exports = postsRouter;
