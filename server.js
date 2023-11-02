const app = require("./app");

const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });

const mongoose = require("mongoose");

const DB = process.env.LOCAL_DATABASE;
//.replace('<PASSWORD>',process.env.PASSWORD);

mongoose
	.connect(DB, {
		useNewUrlParser: true,
	})
	.then((conObj) => {
		console.log("DB Successfully Connected....🔥");
	})
	.catch((err) => {
		console.log("Error Connecting to MongoDB :", err);
	});

const port = process.env.PORT || 9999;

app.listen(port, () => {
	console.log("Server Started Successfully....😎");
});
