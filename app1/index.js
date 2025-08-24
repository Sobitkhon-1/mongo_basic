/*import {MongoClient} from "mongodb"
const connectionString = "mongodb://localhost:27017"

const client = new mongoClient(connectionString)
console.log(client)
await client.connect()
const db=client.db("app1")

const students = db.collection("students");
console.log(students);

*/
/*
import express from "express";
import { MongoClient } from "mongodb";

const app = express();
const port = 3000;

app.use(express.json());

const connectionString = "mongodb://localhost:27017";
const client = new MongoClient(connectionString);

async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("app1");
    const students = db.collection("students");

    app.get("/students", async (req, res) => {
      const allStudents = await students.find().toArray();
      res.json(allStudents);
    });

    app.post("/students", async (req, res) => {
      const newStudent = req.body;
      const result = await students.insertOne(newStudent);
      res.json({ insertedId: result.insertedId });
    });

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error:", err);
  }
}*/

// index.js
import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// MongoDB connection
const url = "mongodb://127.0.0.1:27017"; // change if your Mongo URL is different
const client = new MongoClient(url);
const dbName = "school"; // your database name
let db, students;

async function connectDB() {
  await client.connect();
  console.log("✅ Connected to MongoDB");
  db = client.db(dbName);
  students = db.collection("students");
}
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Hello, Mongo + Express!");
});

// Get student by ID
app.get("/students/:id", async (req, res) => {
  try {
    const student = await students.findOne({ _id: new ObjectId(req.params.id) });
    if (!student) return res.status(404).send("Student not found");
    res.json(student);
  } catch (err) {
    res.status(500).send("❌ Error: " + err.message);
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
