/*eslint-disable*/
//This is the User Authentication controller Used when First Creating the User

//Importing Json Web Token
const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const handleAsync = require("../utils/handleAsync");
const GlobaError = require("../utils/globalError");

//This is a function to create and send the JWT when all the middleware checking is done
//It also sends a jwt cookie to be stored by the browser !!
const createSendToken = (user, statusCode, res) => {
	//Creating and signing the  webtoken
	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		//An option..
		expiresIn: process.env.JWT_EXPIRES_IN,
	});

	//these are the cookie options...
	const cookieOptions = {
		//converting into ms
		expiresIn: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60
		),
		//this will prevent the browser from accessing the cookie and make it transportOnly
		httpOnly: true,
	};

	//since https is only available in production
	if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

	//making and sending the cookie
	//cookie is the only response that we can send along with the main response
	res.cookie("jwt", token, cookieOptions);

	//Removing the password element since it is selected using explicit select==true in the middlewares for password checking
	user.password = undefined;

	res.status(statusCode).json({
		status: "Created Successfully",
		//Sending the token to the user to save it locally
		token,
		user: user,
	});
};

exports.signup = handleAsync(async (req, res, next) => {
	//Create the user with only required fields form the body to keep anyone from defining the role as admin
	const newUser = await User.create({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
	});
	createSendToken(newUser, 201, res);
});

exports.login = handleAsync(async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	//Check if both the email and passwords are present !!
	if (!email || !password)
		return next(new GlobaError("Enter both email and Password !!", 404));

	//Check if the input email and password are correct
	const match = await User.findOne({ email: email }).select("+password"); //to select the password since it will not be selected implicitely
	if (!match) return next(new GlobaError("Email not present !!", 404));

	if (!(await match.comparePasswords(password, match.password)))
		//using the instance method of user documents
		return next(new GlobaError("Password Incorrect !!", 400));

	//Sign and return the JWT
	createSendToken(match, 201, res);
});

exports.protect = handleAsync(async (req, res, next) => {
	let token;
	//1. Getting the token & Checking if it is there with the header??
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	} else if (req.cookies.jwt) {
		// To check for the jwt in cookie
		token = req.cookies.jwt;
	} else {
		return next(
			new GlobaError("You are not LoggedIn please login to get access", 401)
		);
	}
	//2. Verification of Token
	const payload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	//3. Checking if the user still exists
	const currentUser = await User.findById(payload.id);
	if (!currentUser) {
		return next(new GlobaError("User does not exist signUp to access !!", 401));
	}

	//We save the current user in the request object for use in later middlewares...If Required !!
	//but this is how we can pass refined data from one middleware to another sequentially
	req.user = currentUser;

	//Now we can use this in the window
	res.locals.user = currentUser;

	next();
});
