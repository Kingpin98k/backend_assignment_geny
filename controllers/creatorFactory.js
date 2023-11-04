//Here we create Factory functions for handlers of all controllers
//Factory function takes in certain arguments and returns a function to be used by the controller
//WE use (...args) => 'function code' to create and return the function
//-------------------------------------------------------------------------------------------------
const handleAsync = require("../utils/handleAsync");
const GlobalError = require("../utils/globalError");
//-------------------------------------------------------------------------------------------------

//>.DELETE DOCUMENT
exports.deleteOne = (
	Model //This is the function that will be returned
) =>
	handleAsync(async (req, res, next) => {
		const doc = await Model.findByIdAndDelete(req.params.id);

		//If the tourId does not match mongoDb sets data to null and response code is 200
		//but we want to set it to 404
		if (!doc) {
			return next(new GlobalError("No document found with that ID", 404)); //We are returninghere to prevent code to move to next line and send 2-responses
		}

		res.status(204).json({
			status: "Successful",
			deleted_data: doc,
		});
	});

//>.CREATE DOCUMENT
exports.createOne = (Model) =>
	handleAsync(async (req, res, next) => {
		const doc = await Model.create(req.body);
		res.status(201).json({
			status: "Successful",
			data: doc,
		});
	});

//>.UPDATE DOCUMENT
exports.updateOne = (Model) =>
	handleAsync(async (req, res, next) => {
		const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		//If the tourId does not match mongoDb sets data to null and response code is 200
		//but we want to set it to 404
		if (!doc) {
			return next(new GlobalError("No document found with that ID", 404)); //We are returninghere to prevent code to move to next line and send 2-responses
		}
		res.status(200).json({
			status: "Successful",
			data: doc,
		});
	});

//>.GET ONE DOCUMENT
exports.getOne = (Model) =>
	handleAsync(async (req, res, next) => {
		const doc = await Model.findById(req.params.id);
		if (!doc) {
			return next(new GlobalError("No Document found with that ID", 404));
		}
		res.status(200).json({
			status: "Successful",
			data: doc,
		});
	});

//>.GET ALL DOCUMENTS
//This is a special one since we can add the filtering functionalities to all the models using this...
exports.getAll = (Model) =>
	handleAsync(async (req, res, next) => {
		const doc = await Model.find();
		// SEND RESPONSE
		res.status(200).json({
			status: "success",
			results: doc.length,
			data: {
				doc,
			},
		});
	});
