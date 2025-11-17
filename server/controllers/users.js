import pool from "../config/database.js";

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

const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { getUsers, getUserById };
