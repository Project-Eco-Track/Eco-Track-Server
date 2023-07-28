const DigestFetch = require("with-digest-fetch").default;

const publicKey = process.env.TIDB_PUBLIC_KEY_R;
const privateKey = process.env.TIDB_PRIVATE_KEY_R;

const client = new DigestFetch(publicKey, privateKey);

function getCarbonfootprint(req, res) {
  client
    .fetch(`${process.env.GET_CARBON_FOOTPRINT}?id=${req.query.id}`)
    .then((response) => {
      console.log(
        new Date().toLocaleString(),
        " getCarbonFootprint Response status: " + response.status
      );
      if (!response.ok) {
        console.log("Request failed with status: " + response.status);
        res.json("Request failed with status: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Received Data from DataApp:", data);
      res.json(data.data.rows[0]);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
}

module.exports = {
  getCarbonfootprint,
}
