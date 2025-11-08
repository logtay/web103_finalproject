import pool from "./database.js";
import "./dotenv.js";

async function createUserTable() {
  try {
    await pool.query("DROP TABLE IF EXISTS users CASCADE");
    await pool.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(127) NOT NULL,
        password VARCHAR(128) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
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
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        loved_one VARCHAR(127),
        file_path TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
    console.log("✅ Memories table reset successfully.");
  } catch (err) {
    console.error("❌ Error creating memory table:", err);
  }
}

async function createTagTable() {
  try {
    await pool.query("DROP TABLE IF EXISTS tags CASCADE");
    await pool.query(`
      CREATE TABLE tags (
        id SERIAL PRIMARY KEY,
        name VARCHAR(127) UNIQUE NOT NULL,
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
    await pool.query("DROP TABLE IF EXISTS memorytags CASCADE");
    await pool.query(`
      CREATE TABLE memorytags (
        memory_id INTEGER REFERENCES memories(id) ON DELETE CASCADE,
        tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        PRIMARY KEY (memory_id, tag_id)
      )
    `);
    console.log("✅ MemoryTags table reset successfully.");
  } catch (err) {
    console.error("❌ Error creating memory tag table:", err);
  }
}

async function createTables() {
  await createUserTable();
  await createTagTable();
  await createMemoryTable();
  await createMemoryTagTable();
}

createTables();
