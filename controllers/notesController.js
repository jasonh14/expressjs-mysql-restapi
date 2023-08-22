const pool = require("../config/database");

const getNotes = async (req, res) => {
  const [result] = await pool.query("SELECT * FROM notes");
  if (result.length === 0)
    return res.status(204).json({ message: "No notes found" });
  res.json(result);
};

const getNote = async (req, res) => {
  const id = req.params.id;
  const [result] = await pool.query(
    `
    SELECT * FROM notes
    WHERE id = ?
  `,
    [id]
  );
  console.log("result", result);

  if (!result[0]) return res.status(204).json({ message: "No note found" });

  res.status(200).json(result[0]);
};

const createNote = async (req, res) => {
  if (!req?.body?.title || !req?.body?.contents) {
    res.status(400).json({ message: "title and contents are required" });
  }

  try {
    const [result] = await pool.query(
      `
            INSERT INTO notes (title, contents)
            VALUES(?, ?)
        `,
      [req.body.title, req.body.contents]
    );

    res
      .status(201)
      .json({ message: "note successfully created!", id: result.insertId });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getNotes, getNote, createNote };
