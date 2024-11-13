// Import necessary modules
const path = require("path");
const apirouter = require("express").Router();
const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("../helper/fsUtils");
const { v4: uuidv4 } = require("uuid");

// GET route to retrieve all notes
apirouter.get("/notes", (req, res) => {
  console.info(`${req.method} request received for note`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// DELETE route to remove a note by ID
apirouter.delete("/notes/:id", (req, res) => {
  const noteId = req.params.id;
  console.info(
    `${req.method} request received to delete note with id: ${noteId}`
  );

  // Read the current notes data
  readFromFile("./db/db.json").then((data) => {
    const notes = JSON.parse(data);

    // Filter out the note with the specified id
    const updatedNotes = notes.filter((note) => note.id !== noteId);

    // Write the updated notes back to the file
    writeToFile("./db/db.json", updatedNotes);

    res.json(`Note with ID ${noteId} deleted successfully`);
  });
});

// POST route to add a new note
apirouter.post("/notes", (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully 🚀`);
  } else {
    res.status(400).json("Error in adding note: title and text are required.");
  }
});

// Export the router
module.exports = apirouter;
