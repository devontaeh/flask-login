const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config({ path: "../.env" });

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let dbConnection;

module.exports = {
  connectToServer: async () => {
    try {
      await client.connect();
      dbConnection = client.db(process.env.DB_NAME);
      console.log("Success");
    } catch (err) {
      console.log("failed", err);
      throw err;
    }
  },

  getDb: function () {
    return dbConnection;
  },

  closeConnection: function () {
    if (client.isConnected()) {
      client.close();
      console.log("MongoDB connection closed");
    }
  },
};
