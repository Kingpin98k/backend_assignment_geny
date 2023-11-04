const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
// const crypto = require("crypto");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "A user must hane a name"],
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: [validator.isEmail, "Please Provide a Valid Email !"],
	},
	password: {
		type: String,
		required: [true, "A strong Password Is a Must"],
		minlength: 8,
		select: false,
	},
	confirmPassword: {
		type: String,
		required: [true, "Please Confirm the Password"],
		//This validator will only work on SAVE and CERATE and that is why we will need to update the user Using the save method
		validate: {
			validator: function (el) {
				return el === this.password;
			},
			message: "Passwords are Not the Same !",
		},
	},
});

//An Instance method that will be available in all the documents of user model
userSchema.methods.comparePasswords = async function (
	candidatePassword,
	userPassword
) {
	//We cannot use this.password since it is not selected
	return await bcrypt.compare(candidatePassword, userPassword);
};

//Using MongooseMiddleware to Encrypt the password Before Saving it...
userSchema.pre("save", async function (next) {
	//also known as mongooseHook
	//Checking if the password field is mofified or not before encrypting it (the save can also be called when email is changed !!)
	if (!this.isModified("password")) return next(); //returning after calling the next middleware

	//using the async hash function to hash the password
	this.password = await bcrypt.hash(this.password, 12);
	//removing confirm_password field from the document
	this.confirmPassword = undefined;
	next();
});

module.exports = mongoose.model("User", userSchema);
