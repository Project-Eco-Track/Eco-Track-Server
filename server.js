require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./src/api/routes/routes");
const tidbConnection = require("./src/db/tiDB");
const markdownIt = require("markdown-it");
const loginRouter = require('./src/api/user/login');
const blogController = require("./controller/blogController");

// Setting up the Express server
const app = express();
const md = markdownIt();

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Attaching the TiDB connection to the request object
app.use((req, res, next) => {
  req.db = tidbConnection;
  next();
});

// Set up root routes
app.use("/", routes);

// Receiving login details from the frontend
app.use('/api/user/login', loginRouter);

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

// Error management middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Server Error" });
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`The server will be running at http://localhost:${port}`);
});
