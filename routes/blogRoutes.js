const express = require("express");
const blogController = require("../controllers/blogController");
const authController = require("../controllers/authController");

const blogRouter = express.Router();

// Apply protect middleware to all routes within blogRouter
blogRouter.use(authController.protect);

blogRouter
	.route("/posts")
	.get(blogController.getAllBlogs)
	.post(blogController.createBlog);

blogRouter
	.route("/posts/:id")
	.get(blogController.getOneBlog)
	.put(blogController.updateBlog)
	.delete(blogController.deleteBlog);

module.exports = blogRouter;
