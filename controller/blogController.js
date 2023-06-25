const DigestFetch = require("with-digest-fetch").default;

const publicKey = process.env.TIDB_PUBLIC_KEY_R;
const privateKey = process.env.TIDB_PRIVATE_KEY_R;

const client = new DigestFetch(publicKey, privateKey);

function getAllBlogs(req, res) {
  client
    .fetch(process.env.BLOG_GET_ALL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed with status: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      res.json(data.data.rows); // Send the response as JSON to the client
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" }); // Send an error response to the client
    });
}

function getBlogContent(req, res) {}

module.exports = {
  getAllBlogs,
  getBlogContent
};
