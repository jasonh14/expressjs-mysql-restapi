require("dotenv").config();
const path = require("path");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

// cross origin resource sharing
app.use(cors());

// built in middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use("/notes", require("./routes/api/notes"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    console.log("html", req.accepts("html"));
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
