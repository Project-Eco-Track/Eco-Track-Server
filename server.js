require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const tidbConnection = require("./src/db/tiDB");
const markdownIt = require("markdown-it");
const loginRouter = require("./src/api/user/login");
const blogController = require("./controller/blogController");
const quizController = require("./controller/quizController");
const {
  getCarbonfootprint,
} = require("./controller/carbonfootprintController");
const cors = require("cors");

// Setting up the Express server
const app = express();
const md = markdownIt();

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());
app.use(cors());

// Attaching the TiDB connection to the request object
app.use((req, res, next) => {
  req.db = tidbConnection;
  next();
});

// Receiving login details from the frontend
app.use("/api/user/login", loginRouter);

// get a blog post by id
app.get("/api/blog/:id", async (req, res) => {
  // get blog post from TiDB

  const { markdown } = req.body;
  const html = md.render(markdown);
  res.send(html);
});

// Blog routes
app.get("/blogs", blogController.getAllBlogs);
app.get("/blog/:id", blogController.getBlogContent);
app.post("/post/blog", blogController.createBlogPost);

// Calculating the carbon footprint
app.post("/post/carbon-footprint", quizController.calculateCarbonFootprint);

// get carbonfootprint data
app.get("/carbonfootprint", getCarbonfootprint);

// CustomError class for custom errors with specific status codes
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Error management middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Customize error messages based on error types
  let errorMessage = "Server Error";
  let statusCode = 500;

  if (err instanceof CustomError) {
    errorMessage = err.message;
    statusCode = err.statusCode;
  }

  res.status(statusCode).json({ error: errorMessage });
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`The server will be running at http://localhost:${port}`);
});
