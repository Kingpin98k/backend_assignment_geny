const express = require("express");
const blogController = require("../controllers/blogController");
const authController = require("../controllers/authController");
const commentRouter = require("./commentRoutes");

const blogRouter = express.Router();

// Apply protect middleware to all routes within blogRouter
blogRouter.use(authController.protect);

blogRouter
	.route("/")
	.get(blogController.getAllBlogs)
	.post(blogController.createBlog);

blogRouter
	.route("/:id")
	.get(blogController.getOneBlog)
	.put(blogController.updateBlog)
	.delete(blogController.deleteBlog);

blogRouter.use("/:id/comments", commentRouter);

module.exports = blogRouter;
