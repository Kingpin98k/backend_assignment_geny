const handleAsync = require("../utils/handleAsync");
// const GlobalError = require("../utils/globalError");
const User = require("../models/userModel");
const factory = require("./creatorFactory");

exports.createUser = handleAsync(async (req, res, next) => {
	if (!req.body.confirmPassword) {
		req.body.confirmPassword = req.body.password;
	}
	factory.createOne(User);
});
