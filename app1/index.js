/*import {MongoClient} from "mongodb"
const connectionString = "mongodb://localhost:27017"

const client = new mongoClient(connectionString)
console.log(client)
await client.connect()
const db=client.db("app1")

const students = db.collection("students")
console.log(students)*/
import { MongoClient } from "mongodb";

const connectionString = "mongodb://127.0.0.1:27017";
const client = new MongoClient(connectionString);

async function main() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("app1");
    const students = db.collection("students");

    // Insert a test student
    await students.insertOne({ name: "Ali", age: 21 });

    // Fetch students
    const all = await students.find().toArray();
    console.log("📚 Students:", all);

  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
  }
}

main();
