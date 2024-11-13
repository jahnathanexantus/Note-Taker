// require the util and fs needed
// util is a built-in feature of node like fs
const util = require("util");
const fs = require("fs");

// require the uuid/v1 package
const uuidv1 = require("uuid/v1");

// Promisify the fs methods to use async/await
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  // Read the file content asynchronously
  async read() {
    try {
      const data = await readFileAsync("db.json", "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading file:", error);
      return [];
    }
  }

  // Write to the file asynchronously
  async write(data) {
    try {
      await writeFileAsync("db.json", JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error writing file:", error);
    }
  }

  // Get all notes
  async getNotes() {
    return this.read();
  }

  // Add a new note
  async addNote(note) {
    const notes = await this.getNotes();
    const newNote = { id: uuidv1(), ...note };
    notes.push(newNote);
    await this.write(notes);
    return newNote;
  }

  // Delete a note by id
  async deleteNote(id) {
    let notes = await this.getNotes();
    notes = notes.filter((note) => note.id !== id);
    await this.write(notes);
  }
}

module.exports = new Store();
