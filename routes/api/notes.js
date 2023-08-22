const express = require("express");
const router = express.Router();

const { getNotes } = require("../../controllers/notesController");

router.route("/").get(getNotes);

module.exports = router;
