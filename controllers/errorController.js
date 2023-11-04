/* eslint-disable */

const GlobaError = require("../utils/globalError");

const handleCastErrorDB = (err) => {
	const message = `Invalid ${err.path}: ${err.value}.`;
	return new GlobaError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
	const value = err.keyValue.name;
	// console.log(value);

	const message = `Duplicate field value: ${value}. Please use another value!`;
	return new GlobaError(message, 400);
};
const handleValidationErrorDB = (err) => {
	const errors = Object.values(err.errors).map((el) => el.message);

	const message = `Invalid input data. ${errors.join("/ ")}`;
	return new GlobaError(message, 400);
};

//Both the errors while verifying the JWT
const handleJsonWebTokenError = (err) =>
	new GlobaError("Invalid token Please Login again !!", 401);

const handleTokenExpiredError = (err) =>
	new GlobaError("Token Expired Please Login again !!", 401);

const sendError = (err, req, res) => {
	//Error handling for the API
	if (req.originalUrl.startsWith("/api")) {
		res.status(err.statusCode).json({
			status: err.status,
			error: err,
			message: err.message,
			stack: err.stack,
		});
	} else {
		//Error handling for the RENDERED WEBSITE
		res.status(err.statusCode).render("error", {
			title: "Something Went Wrong !",
			msg: err.message,
		});
	}
};

module.exports = (error, req, res, next) => {
	// console.log(err.stack);
	//Sometimes some internal node errors may not have a status code
	error.statusCode = error.statusCode || 500;
	error.status = error.status || "error";

	if (error.kind === "ObjectId") error = handleCastErrorDB(error);
	if (error.code === 11000) error = handleDuplicateFieldsDB(error);
	if (error._message === "Validation failed")
		error = handleValidationErrorDB(error);
	//JWT Verification Errors
	if (error.name === "JsonWebTokenError")
		error = handleJsonWebTokenError(error);
	if (error.name === "TokenExpiredError")
		error = handleTokenExpiredError(error);
	sendError(error, req, res);
};
