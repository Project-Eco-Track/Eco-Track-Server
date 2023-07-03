const DigestFetch = require("with-digest-fetch").default;

const publicKey = process.env.TIDB_PUBLIC_KEY_R;
const privateKey = process.env.TIDB_PRIVATE_KEY_R;

const client = new DigestFetch(publicKey, privateKey);

function getAllBlogs(req, res) {
  client
    .fetch(process.env.BLOG_GET_ALL)
    .then((response) => {
      if (!response.ok) {
        res.json("Request failed with status: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      res.json(data.data.rows);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
}

function getBlogContent(req, res) {
  client
    .fetch(`${process.env.BLOG_GET_BLOG_POST}?id=${req.params.id}`)
    .then((response) => {
      if (!response.ok) {
        res.json("Request failed with status: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      res.json(data.data.rows[0]);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
}

async function getFeaturedBlogID(req, res) { //! not sure if this is needed
  client
    .fetch(process.env.BLOG_GET_FEATURED)
    .then((response) => {
      if (!response.ok) {
        res.json("Request failed with status: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      res.json(data.data.rows[0].id);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
}

// Creating a blog post with user ID
async function createBlogPost(req, res) {
  try {
    const userId = req.userId;
    const { title, content } = req.body;

    // Insert the blog post into the TiDB database
    const insertQuery = `INSERT INTO blog_posts (title, content, user_id) VALUES (?, ?, ?)`;
    const insertValues = [title, content, userId];
    await req.db.query(insertQuery, insertValues);

    res.status(200).json({ message: "Blog post created successfully" });
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ error: "Failed to create blog post" });
  }
}

module.exports = {
  getAllBlogs,
  getBlogContent,
};
