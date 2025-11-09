import { pool }  from "../config/database.js";

const createMemory = async (req, res) => {
  try {
    const { title, body, user_id, loved_one, file_path } = req.body;

    const results = await pool.query(
      `
      INSERT INTO memories (title, body, user_id, loved_one, file_path)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [title, body, user_id, loved_one, file_path]
    );

    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
}
const getMemories = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM memories ORDER BY created_at DESC');
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updateMemory = async (req, res) => {
  try {
      const id = parseInt(req.params.id)
      const { title, body, user_id, loved_one, file_path } = req.body
      const results = await pool.query(`
          UPDATE memories SET title = $1, body = $2, user_id = $3, loved_one = $4, file_path = $5 WHERE id = $6
          RETURNING *`,
          [title, body, user_id, loved_one, file_path , id]
      )
      if (!results.rows.length) {
          return res.status(404).json({ error: 'Memory not found' })
      }
      res.status(200).json(results.rows[0])
    } catch (error) {
      res.status(409).json({ error: error.message })
    }
}

const deleteMemory = async (req, res) => {
  try {
      const id = parseInt(req.params.id)
      const results = await pool.query('DELETE FROM memories WHERE id = $1 RETURNING *', [id])
            if (!results.rows.length) {
          return res.status(404).json({ error: 'Memory not found' })
      }
      res.status(200).json(results.rows[0])
  } catch (error) {
      res.status(409).json( { error: error.message } )
  }
}

const getMemoryById = async (req, res) => {
  try {
      const id = parseInt(req.params.id)
      const results = await pool.query('SELECT * FROM memories WHERE id = $1', [id])
      res.status(200).json(results.rows[0])
  } catch (error) {
      res.status(500).json( { error: error.message } )
  }
}

export default { createMemory, getMemories, updateMemory, deleteMemory, getMemoryById };