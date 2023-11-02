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

const sendError = (err, req, res) => {
	//---------------->>API PART<<---------------------------
	if (req.originalUrl.startsWith("/api")) {
		// Operational, trusted error: send message to client
		if (err.isOperational) {
			res.status(err.statusCode).json({
				status: err.status,
				error: err,
				message: err.message,
			});

			// Programming or other unknown error: don't leak error details
		} else {
			// 1) Log error
			console.error("ERROR 💥", err);

			// 2) Send generic message
			res.status(500).json({
				status: "error",
				message: "Something went very wrong!",
			});
		}
	} //--------------------->>WEBSITE PART<<----------------------------
	else {
		// Operational, trusted error: send message to client
		if (err.isOperational) {
			res.status(err.statusCode).render("error", {
				title: "Something Went Wrong !",
				msg: err.message,
			});

			// Programming or other unknown error: don't leak error details
		} else {
			// 1) Log error
			console.error("ERROR 💥", err);

			// 2) Send generic message
			res.status(err.statusCode).render("error", {
				title: "Something Went Wrong !",
				msg: "Please try again !!",
			});
		}
	}
};

module.exports = (error, req, res, next) => {};
