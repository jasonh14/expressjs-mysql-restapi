const pool = require("../config/database");

const getNotes = async (req, res) => {
  const [result] = await pool.query("SELECT * FROM notes");
  if (result.length === 0)
    return res.status(204).json({ message: "No notes found" });
  res.json(result);
};

module.exports = { getNotes };
