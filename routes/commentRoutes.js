const express = require("express");
const commentController = require("../controllers/commentController");
const authController = require("../controllers/authController");

const commentRouter = express.Router({ mergeParams: true });

commentRouter.route("/").post(commentController.createComment);

commentRouter
	.route("/:commentId")
	.put(commentController.updateComment)
	.delete(commentController.deleteComment);

commentRouter.get(
	"/",
	authController.protect,
	commentController.getAllComments
);

commentRouter.get(
	"/:id",
	authController.protect,
	commentController.getOneComment
);

module.exports = commentRouter;
