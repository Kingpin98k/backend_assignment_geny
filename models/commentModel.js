const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
	{
		content: { type: String, required: true },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "A comment must belong to a user"],
		},
		blog: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Blog",
			required: [true, "A comment must be on a blog post "],
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

//Indexing the tour and user to make user-blog comment combo unique
commentSchema.index({ blog: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Comment", commentSchema);
