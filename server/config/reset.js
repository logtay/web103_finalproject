import pool from "./database.js";
import "./dotenv.js";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();
const dataPath = path.join(__dirname, "./data/data.json");

const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

async function createUserTable() {
  try {
    await pool.query("DROP TABLE IF EXISTS users CASCADE");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id serial PRIMARY KEY,
        githubid int NOT NULL,
        username varchar(200) NOT NULL,
        avatarurl varchar(500),
        accesstoken varchar(500) NOT NULL
      );
    `);
    console.log("✅ User table reset successfully.");
  } catch (err) {
    console.error("❌ Error creating user table:", err);
  }
}

async function createMemoryTable() {
  try {
    await pool.query("DROP TABLE IF EXISTS memories CASCADE");
    await pool.query(`
      CREATE TABLE memories (
        id SERIAL PRIMARY KEY,
        title VARCHAR(127) NOT NULL,
        body TEXT,
        date TIMESTAMP NOT NULL,
        file_path TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL
      )
    `);
    console.log("✅ Memories table reset successfully.");
  } catch (err) {
    console.error("❌ Error creating memory table:", err);
  }
}

async function createLovedOnesTable() {
  try {
    await pool.query("DROP TABLE IF EXISTS loved_ones CASCADE");
    await pool.query(`
      CREATE TABLE loved_ones (
        id SERIAL PRIMARY KEY,
        name VARCHAR(31) UNIQUE NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
    console.log("✅ LovedOnes table reset successfully.");
  } catch (err) {
    console.error("❌ Error creating loved ones table:", err);
  }
}

async function createMemoryLovedOnesTable() {
  try {
    await pool.query("DROP TABLE IF EXISTS memory_loved_ones CASCADE");
    await pool.query(`
      CREATE TABLE memory_loved_ones (
        memory_id INTEGER REFERENCES memories(id) ON DELETE CASCADE,
        loved_one_name VARCHAR(31) REFERENCES loved_ones(name) ON DELETE CASCADE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        PRIMARY KEY (memory_id, loved_one_name)
      )
    `);
    console.log("✅ MemoryLovedOnes table reset successfully.");
  } catch (err) {
    console.error("❌ Error creating memory loved ones table:", err);
  }
}

async function createTagTable() {
  try {
    await pool.query("DROP TABLE IF EXISTS tags CASCADE");
    await pool.query(`
      CREATE TABLE tags (
        id SERIAL PRIMARY KEY,
        name VARCHAR(31) UNIQUE NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
    console.log("✅ Tags table reset successfully.");
  } catch (err) {
    console.error("❌ Error creating tag table:", err);
  }
}

async function createMemoryTagTable() {
  try {
    await pool.query("DROP TABLE IF EXISTS memory_tags CASCADE");
    await pool.query(`
      CREATE TABLE memory_tags (
        memory_id INTEGER REFERENCES memories(id) ON DELETE CASCADE,
        tag_name VARCHAR(31) REFERENCES tags(name) ON DELETE CASCADE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        PRIMARY KEY (memory_id, tag_name)
      )
    `);
    console.log("✅ MemoryTags table reset successfully.");
  } catch (err) {
    console.error("❌ Error creating memory tag table:", err);
  }
}

async function poolLovedOnesTable() {
  try {
    const values = data.lovedOnes.map((lo) => `('${lo.replace("'", "''")}')`);
    await pool.query(`INSERT INTO loved_ones (name) VALUES ${values}`);
    console.log("✅ All loved ones inserted successfully.");
  } catch (err) {
    console.error("❌ Error inserting into loved ones table:", err);
  }
}

async function poolTagTable() {
  try {
    const values = data.tags.map((tag) => `('${tag.replace("'", "''")}')`);
    const query = `INSERT INTO tags (name) VALUES ${values}`;
    await pool.query(query);
    console.log("✅ All tags inserted successfully.");
  } catch (err) {
    console.error("❌ Error inserting into tag table:", err);
  }
}

async function createTables() {
  try {
    await createUserTable();
    await createMemoryTable();
    await createLovedOnesTable();
    await createMemoryLovedOnesTable();
    await createTagTable();
    await createMemoryTagTable();
    await poolLovedOnesTable();
    await poolTagTable();
  } catch (err) {
    console.error("❌ Error creating all tables:", err);
  }
}

createTables();
