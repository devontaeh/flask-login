const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config({ path: "../.env" });

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

// console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
// var _db;
let dbConnection;

// async function connectToServer(){
//     try{
//         await client.connect()
//         dbConnection = client.db(process.env.DB_NAME)
//         console.log("success")
//     }catch (err){
//         console.log("error:", err)
//         throw err
//     }
// }

// function getDb(){
//     return dbConnection
// }

// module.exports = {connectToServer, getDb}

module.exports = {
  connectToServer: async function () {
    try {
      await client.connect();
      dbConnection = client.db(process.env.DB_NAME);
      console.log("Success");
    } catch (err) {
      console.log("failed");
      throw err
    }
  },

  getDb: function () {
    return dbConnection;
  },
};

// async function run() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();
//     const db = client.db(process.env.DB_NAME);
//     const collection = db.collection("users");
//     console.log(
//       "Found docs => ",
//       await collection.find({ first_name: "devontae" }).toArray()
//     );

//     // // Send a ping to confirm a successful connection
//     // await client.db("admin").command({ ping: 1 });
//     // console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } catch (error) {
//     console.log(`Error ${error}`);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
