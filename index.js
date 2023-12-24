const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ObjectId } = require("mongodb");
const URL = "mongodb://localhost:27017";

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

const user = [];
app.get("/users", async (req, res) => {
  try {
    const connection = await MongoClient.connect(URL);
    const db = connection.db("nodeDB");
    const user = await db.collection("users").find().toArray();
    await connection.close();
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
    });
  }
});

app.post("/user", async (req, res) => {
  try {
    const connection = await MongoClient.connect(URL);
    const db = connection.db("nodeDB");
    const user = await db.collection("users").insertOne(req.body);
    await connection.close();
    res.json({
      message: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
    });
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const connection = await MongoClient.connect(URL);
    const db = connection.db("nodeDB");
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(req.params.id) });
    await connection.close();
    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: "something went wrong",
    });
  }
});

app.put("/user/:id", async (req, res) => {
  try {
    const connection = await MongoClient.connect(URL);
    const db = connection.db("nodeDB");
    const user = await db
      .collection("users")
      .findOneAndUpdate(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
      );
    await connection.close();
    res.json({
      message: "update",
    });
  } catch (err) {
    res.status(500).json({
      message: "something went wrong",
    });
  }
});

app.delete("/user/:id", async (req, res) => {
 
  try{
    const connection=await MongoClient.connect(URL)
    const db=connection.db("nodeDB")
    const user=await db.collection("users").deleteOne({_id:new ObjectId(req.params.id)})
    await connection.close()
    res.json({
      message:"delete"
    })
  }catch(err){
    res.json({
      message:"something went wrong"
    })
  }
});

app.listen(3000);

