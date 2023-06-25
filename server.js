require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./src/api/routes/routes");
const tidbConnection = require("./src/db/tiDB");
const markdownIt = require("markdown-it");

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
app.post("/api/user/login", async (req, res) => {
  try {
    // extracting user informations from the request payload
    const { userId, name, email } = req.body;

    // Storing details in TiDB
    await tidb.storeUserDetails(userId, name, email);

    // Response
    res.status(200).json({ message: "User details stored successfully" });
  } catch (error) {
    console.error("Error storing user details:", error);
    res.status(500).json({ error: "Failed to store user details" });
  }
});

// get a blog post by id
app.get("/api/blog/:id", async (req, res) => {
  // get blog post from TiDB

  const { markdown } = req.body;
  const html = md.render(markdown);
  res.send(html);
});

app.get("/blogs", blogController.getAllBlogs);

// Error management middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Server Error" });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The server will be running at http://localhost:${port}`);
});
