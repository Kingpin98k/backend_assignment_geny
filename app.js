const express = require("express");
const GlobalError = require("./utils/globalError");
const globalErrorHandler = require("./controllers/errorController");
const cookieParser = require("cookie-parser");

const app = express();

const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");

//Body Parser converting data from body into req.body
app.use(express.json({ limit: "32kb" })); //setting the body limit ot 10kb
app.use(cookieParser());
app.use(globalErrorHandler);

app.use("/api", userRouter, blogRouter);

app.all("*", (req, res, next) => {
	const err = new GlobalError(`Can't Find ${req.url}`, 404);
	next(err);
});

module.exports = app;
