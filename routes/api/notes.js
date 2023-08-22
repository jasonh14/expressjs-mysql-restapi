const express = require("express");
const router = express.Router();

const {
  getNotes,
  getNote,
  createNote,
} = require("../../controllers/notesController");

router.route("/").get(getNotes).post(createNote);
router.route("/:id").get(getNote);

module.exports = router;
