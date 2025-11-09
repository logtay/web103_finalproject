
import { pool }  from "../config/database.js";

const createTag = async (req, res) => {
  try {
    const {name} = req.body;

    const results = await pool.query(
      `
      INSERT INTO tags (name)
      VALUES ($1)
      RETURNING *
      `,
      [name]
    );

    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
}
const getTags = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM tags ORDER BY created_at DESC');
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


const deleteTag = async (req, res) => {
  try {
      const id = parseInt(req.params.id)
      const results = await pool.query('DELETE FROM tags WHERE id = $1 RETURNING *', [id])
            if (!results.rows.length) {
          return res.status(404).json({ error: 'Tag not found' })
      }
      res.status(200).json(results.rows[0])
  } catch (error) {
      res.status(409).json( { error: error.message } )
  }
}

const getTagById = async (req, res) => {
  try {
      const id = parseInt(req.params.id)
      const results = await pool.query('SELECT * FROM tags WHERE id = $1', [id])
      res.status(200).json(results.rows[0])
  } catch (error) {
      res.status(500).json( { error: error.message } )
  }
}

export default { createTag, getTags, deleteTag, getTagById };