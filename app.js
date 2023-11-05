const express = require("express");
const compression = require("compression");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
//Added Security Headers
const helmet = require("helmet");

const app = express();

//1) Against NoSQL Query Injection
app.use(mongoSanitize());

//2) Against XSS/Cross Site Scripting
app.use(xss());
//Security Headers
app.use(helmet());
//This is a package that provides a rateLimiter middleware that limits the amount of requests from an ip to a particular route...
const rateLimiter = require("express-rate-limit");

//Creating a rate limiter
const limiter = rateLimiter({
	//Amount of requests per window
	max: 100,
	//Window size in ms
	windowMs: 60 * 60 * 1000, //one hour
	//Message on error
	message: "Too many requests from this IP, try again in an hour !!",
});
//using the limiter middleware
app.use("/api", limiter);

app.use(compression()); //This will compress the responses dramatically

const GlobalError = require("./utils/globalError");
const globalErrorHandler = require("./controllers/errorController");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");
const commentRouter = require("./routes/commentRoutes");

//Body Parser converting data from body into req.body
app.use(express.json({ limit: "32kb" })); //setting the body limit ot 10kb
app.use(cookieParser());
app.use(globalErrorHandler);

app.use("/api", userRouter);
app.use("/api/posts", blogRouter);
app.use("/api/comments", commentRouter);

app.all("*", (req, res, next) => {
	const err = new GlobalError(`Can't Find ${req.url}`, 404);
	next(err);
});

module.exports = app;
