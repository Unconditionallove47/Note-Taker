const path = require("path");
const express = require("express");
const fs = require("fs");
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    res.json(JSON.parse(data));
  });
});

// GET Route for feedback page
app.get("/api/notes", (req, res) =>
  res.readFile(path.join(__dirname, "/db.json"))
);

app.post("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db.json"));
});

app.post("/api/notes", (req, res) => {
  // Log that a POST request was taken in
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
    };
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const parsedNotes = JSON.parse(data);

        parsedNotes.push(newNote);

        fs.writeFile(
          "./db/db.json",
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info("Successfully updated notes!")
        );
      }
    });
  } else {
    res.status(500).json("Error in posting review");
  }
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
