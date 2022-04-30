// export the router
// require the path and router items needed
const path = require("path");
const apirouter = require("express").Router();
const { readFromFile, readAndAppend } = require("../helper/fsUtils");
// const uuid = require("../helper/uuid");
const { v4: uuidv4 } = require('uuid');
apirouter.get("/notes", (req, res) => {
	console.info(`${req.method} request received for note`);
	readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

apirouter.post("*", (req, res) => {
	console.info(`${req.method} request received to add a note`);
	console.log(req.body);

	const { title, text } = req.body;
	if (req.body) {
		const newNote = {
			title,
			text,
            id: uuidv4()
		};

		readAndAppend(newNote, "./db/db.json");
		res.json(`note add sucessfully 🚀`);
	} else {
		res.error("Error in adding tip");
	}
});



// export the router
module.exports = apirouter;
