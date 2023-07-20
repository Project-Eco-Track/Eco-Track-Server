const DigestFetch = require("with-digest-fetch").default;

const publicKey = process.env.TIDB_PUBLIC_KEY_R;
const privateKey = process.env.TIDB_PRIVATE_KEY_R;

const client = new DigestFetch(publicKey, privateKey);

function getAllBlogs(req, res) {
  const filterValue = req.query.filter;

  let url = process.env.BLOG_ENDPOINT_URL;
  if (filterValue === "Top Picks") {
    url = `${url}/getTopPicks`;
  } else if (filterValue === "Recent") {
    url = `${url}/getRecent`;
  } else if (filterValue === "Popular") {
    url = `${url}/getPopular`;
  }
  else if (filterValue === "Eco Verified") {
    url = `${url}/getEcoVerified`;
  }

  try {
    client
      .fetch(url)
      .then((response) => {
        console.info(
          new Date().toLocaleString(),
          " getAllBlogs Response status: " +
            response.status +
            " \n\t:-filterValue: " +
            filterValue
        );
        if (!response.ok) {
          console.error("Request failed with status: " + response.status);
          return res.status(response.status).json({
            error: "Request failed with status: " + response.status,
          });
        } else {
          return response.json();
        }
      })
      .then((data) => {
        res.json(data.data.rows);
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function getBlogContent(req, res) {
  client
    .fetch(`${process.env.BLOG_GET_BLOG_POST}?id=${req.params.id}`)
    .then((response) => {
      console.log(
        new Date().toLocaleString(),
        " getBlogContent Response status: " + response.status
      );
      if (!response.ok) {
        console.log("Request failed with status: " + response.status);
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

async function getFeaturedBlogID(req, res) {
  //! not sure if this is needed
  client
    .fetch(process.env.BLOG_GET_FEATURED)
    .then((response) => {
      console.log(
        new Date().toLocaleString(),
        " getFeaturedBlogID Response status: " + response.status
      );
      if (!response.ok) {
        console.log("Request failed with status: " + response.status);
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
  console.log(
    new Date().toLocaleString(),
    " createBlogPost Response status: " + response.status
  );
  console.log("request");
}

module.exports = {
  getAllBlogs,
  getBlogContent,
  getFeaturedBlogID,
  createBlogPost,
};
