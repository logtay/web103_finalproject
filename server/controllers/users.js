import pool from "../config/database.js";

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const results = await pool.query(
      `
      INSERT INTO users (username, password)
      VALUES ($1, $2)
      RETURNING *
      `,
      [username, password]
    );

    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
const getUsers = async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT * FROM users ORDER BY created_at DESC"
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { username, password } = req.body;
    const results = await pool.query(
      `
          UPDATE users SET username = $1, password = $2 WHERE id = $3
          RETURNING *`,
      [username, password, id]
    );
    if (!results.rows.length) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    if (!results.rows.length) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { createUser, getUsers, updateUser, deleteUser, getUserById };
