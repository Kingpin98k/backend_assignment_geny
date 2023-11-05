const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
	{
		title: { type: String, required: [true, "A blog must have a title"] },
		content: {
			type: String,
			required: [true, "A blog must have somme content"],
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "A blog must have an author"],
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

blogSchema.pre(/^find/, function (next) {
	//We can also pass an object specifying to select only certain fields in the output !!
	this.populate({ path: "author", select: "-__v -passwordChangedAt" });
	next();
});

//Virtually populating the comments everytime someone queries for the blogs
blogSchema.virtual("comments", {
	ref: "Comment",
	foreignField: "blog",
	localField: "_id",
});

const Blogs = mongoose.model("Blog", blogSchema);

module.exports = Blogs;
