const handleAsync = require("../utils/handleAsync");
const Comment = require("../models/commentModel");
const Blog = require("../models/blogModel");
const factory = require("./creatorFactory");

exports.createComment = handleAsync(async (req, res, next) => {
	req.body.blog = req.params.id;

	req.body.user = req.user.id;

	const comment = await Comment.create(req.body);
	res.status(201).json({
		status: "Successfully Created",
		comment: comment,
	});
});

exports.updateComment = handleAsync(async (req, res, next) => {
	const blog = req.params.id || req.params.postId;
	const comment = req.params.commentId;

	const data = await Blog.findById(blog);
	if (!data) {
		res.status(404).json({
			error: "Cannot find BlogPost!",
		});
	}

	const updatedData = await Comment.findByIdAndUpdate(
		comment,
		req.body.content
	);

	if (!updatedData) {
		res.status(404).json({
			error: "Cannot find comment !",
		});
	}

	res.status(200).json({
		status: "Successfully Updated",
		data: updatedData,
	});
});

exports.deleteComment = handleAsync(async (req, res, next) => {
	const blog = req.params.id || req.params.postId;
	const comment = req.params.commentId;

	const data = await Blog.findById(blog);
	if (!data) {
		res.status(404).json({
			error: "Cannot find BlogPost!",
		});
	}

	const updatedData = await Comment.findByIdAndDelete(comment);

	if (!updatedData) {
		res.status(404).json({
			error: "Cannot find comment !",
		});
	}

	res.status(204).json({
		status: "Successfully Deleted",
		data: updatedData,
	});
});

exports.getAllComments = factory.getAll(Comment);

exports.getOneComment = factory.getOne(Comment);
