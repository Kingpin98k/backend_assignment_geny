const handleAsync = require("../utils/handleAsync");
// const GlobalError = require("../utils/globalError");
const Blog = require("../models/blogModel");
const GlobaError = require("../utils/globalError");
// const factory = require("./creatorFactory");

exports.createBlog = handleAsync(async (req, res, next) => {
	req.body.author = req.user.id;

	const blog = await Blog.create(req.body);

	res.status(201).json({
		status: "Successfuly Created",
		data: blog,
	});
});

exports.getAllBlogs = handleAsync(async (req, res, next) => {
	const data = await Blog.find().populate({ path: "comments" });
	res.status(200).json({
		blogs: data,
	});
});

exports.getOneBlog = handleAsync(async (req, res, next) => {
	const data = await Blog.findById(req.params.id).populate({
		path: "comments",
	});
	res.status(200).json({
		blogs: data,
	});
});

exports.updateBlog = handleAsync(async (req, res, next) => {
	const blog = await Blog.findById(req.params.id);

	if (blog.author._id.toString() !== req.user.id) {
		res.status(404).json({
			error: "Not allowed !",
		});
	}

	const doc = await Blog.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	//If the tourId does not match mongoDb sets data to null and response code is 200
	//but we want to set it to 404
	if (!doc) {
		return next(new GlobaError("No document found with that ID", 404)); //We are returninghere to prevent code to move to next line and send 2-responses
	}
	res.status(200).json({
		status: "Successful",
		data: doc,
	});
});

exports.deleteBlog = handleAsync(async (req, res, next) => {
	const blog = await Blog.findById(req.params.id);

	if (blog.author._id.toString() !== req.user.id) {
		res.status(404).json({
			error: "Not allowed !",
		});
	}

	const doc = await Blog.findByIdAndDelete(req.params.id);
	//If the tourId does not match mongoDb sets data to null and response code is 200
	//but we want to set it to 404
	if (!doc) {
		return next(new GlobaError("No document found with that ID", 404)); //We are returninghere to prevent code to move to next line and send 2-responses
	}
	res.status(204).json({
		status: "Successful",
		data: doc,
	});
});
