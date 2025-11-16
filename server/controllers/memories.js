import pool from "../config/database.js";

const createMemory = async (req, res) => {
  const client = await pool.connect();
  try {
    const { userId, title, description, date, media, lovedOnes, tags } =
      req.body;
    await client.query("BEGIN");

    const memoryResult = await client.query(
      `
      INSERT INTO memories (title, body, date, file_path, user_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
      `,
      [title, description, date, media, userId]
    );

    const memory = memoryResult.rows[0];

    if (lovedOnes.length > 0) {
      const lovedValues = lovedOnes.map((lo) => `(${memory.id}, '${lo}')`);
      const lovedQuery = `
        INSERT INTO memory_loved_ones (memory_id, loved_one_name)
        VALUES ${lovedValues.join(", ")};
      `;
      await client.query(lovedQuery);
    }

    if (tags.length > 0) {
      const tagValues = tags.map((tag) => `(${memory.id}, '${tag}')`);
      const tagQuery = `
        INSERT INTO memory_tags (memory_id, tag_name)
        VALUES ${tagValues.join(", ")};
      `;
      await client.query(tagQuery);
    }

    await client.query("COMMIT");

    res.status(201).json(memory);
  } catch (error) {
    await client.query("ROLLBACK");
    console.log(error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
};

const getMemories = async (req, res) => {
  try {
    const userId = parseInt(req.query.userId);
    const results = await pool.query(
      `
      SELECT
          m.*,
          COALESCE(json_agg(DISTINCT mt.tag_name) FILTER (WHERE mt.tag_name IS NOT NULL), '[]') AS tags,
          COALESCE(json_agg(DISTINCT mlo.loved_one_name) FILTER (WHERE mlo.loved_one_name IS NOT NULL), '[]') AS lovedOnes
      FROM memories AS m
        LEFT JOIN memory_tags AS mt ON mt.memory_id = m.id
        LEFT JOIN memory_loved_ones mlo ON mlo.memory_id = m.id
        WHERE m.user_id = $1
        GROUP BY m.id;
      `,
      [userId]
    );

    res.status(200).json(results.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const updateMemory = async (req, res) => {
  const client = await pool.connect();
  try {
    const id = parseInt(req.params.id);
    const { title, description, date, media, lovedOnes, tags } = req.body;

    await client.query("BEGIN");

    const memoryResult = await client.query(
      `
        UPDATE memories
        SET title = $1,
            body  = $2,
            date = $3
            file_path = $4,
        WHERE id = $5
        RETURNING *;
      `,
      [title, description, date, media, id]
    );

    if (!memoryResult.rows.length) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Memory not found" });
    }

    const memory = memoryResult.rows[0];

    await client.query(
      `
        DELETE FROM memory_loved_ones
        WHERE memory_id = $1;
      `,
      [id]
    );

    if (lovedOnes.length > 0) {
      const lovedValues = lovedOnes.map((lo) => `(${id}, '${lo}')`);

      const lovedQuery = `
        INSERT INTO memory_loved_ones (memory_id, loved_one_name)
        VALUES ${lovedValues.join(", ")};
      `;

      await client.query(lovedQuery);
    }

    await client.query(
      `
        DELETE FROM memory_tags
        WHERE memory_id = $1;
      `,
      [id]
    );

    if (tags.length > 0) {
      const tagValues = tags.map((tag) => `(${id}, '${tag}')`);

      const tagQuery = `
        INSERT INTO memory_tags (memory_id, tag_name)
        VALUES ${tagValues.join(", ")};
      `;

      await client.query(tagQuery);
    }

    await client.query("COMMIT");

    res.status(200).json(memory);
  } catch (error) {
    await client.query("ROLLBACK");
    console.log(error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
};

const deleteMemory = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(
      "DELETE FROM memories WHERE id = $1 RETURNING *",
      [id]
    );

    if (!results.rows.length) {
      return res.status(404).json({ error: "Memory not found" });
    }

    await client.query(
      `
      DELETE FROM memory_loved_ones
      WHERE memory_id = $1;
      `,
      [id]
    );

    await client.query(
      `
        DELETE FROM memory_tags
        WHERE memory_id = $1;
      `,
      [id]
    );

    res.status(200).json(results.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(409).json({ error: error.message });
  }
};

const getMemoryById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userId = parseInt(req.query.userId);
    const results = await pool.query(
      `
      SELECT
          m.*,
          COALESCE(json_agg(DISTINCT mt.tag_name) FILTER (WHERE mt.tag_name IS NOT NULL), '[]') AS tags,
          COALESCE(json_agg(DISTINCT mlo.loved_one_name) FILTER (WHERE mlo.loved_one_name IS NOT NULL), '[]') AS lovedOnes
      FROM memories AS m
        LEFT JOIN memory_tags AS mt ON mt.memory_id = m.id
        LEFT JOIN memory_loved_ones mlo ON mlo.memory_id = m.id
        WHERE m.user_id = $1 AND m.id = $2
        GROUP BY m.id;
      `,
      [userId, id]
    );
    res.status(200).json(results.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export default {
  createMemory,
  getMemories,
  updateMemory,
  deleteMemory,
  getMemoryById,
};
