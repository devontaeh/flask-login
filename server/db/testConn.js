const { ConnectionCheckOutFailedEvent } = require("mongodb");
const { connectToServer, getDb } = require("./conn");
// const { connect } = require('../app')

async function testDb() {
  try {
    await connectToServer();
    console.log("connected");
    const db = getDb();
    const docs = await db.collection("users").find({}).toArray();
    console.log("docs => ", docs);
  } catch (err) {
    console.log("error:", err);
  }
}

testDb();
