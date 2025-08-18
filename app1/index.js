/*import {MongoClient} from "mongodb"
const connectionString = "mongodb://localhost:27017"

const client = new mongoClient(connectionString)
console.log(client)
await client.connect()
const db=client.db("app1")

const students = db.collection("students");
console.log(students);

*/
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
}

main();
/*
import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
const PORT = 3000;

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

async function main() {
  try {
    await client.connect();
    console.log(" Connected to MongoDB");

    const db = client.db("school");
    const students = db.collection("students");

    app.get("/students", async (req, res) => {
      const all = await students.find().toArray();
      res.json(all);
    });

    app.get("/students/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const student = await students.findOne({ _id: new ObjectId(id) });

        if (!student) {
          return res.status(404).json({ message: "Student not found" });
        }
        res.json(student);
      } catch (err) {
        res.status(400).json({ message: "Invalid ID format" });
      }
    });

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

main();

*/