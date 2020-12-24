"use strict";

const api = require("./ApiFunctions.js");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("server running");
});

app.post("/validateInput", (req, res) => {
	let result = api.validate(req.body.form, req.body.rules);

	if (result === undefined || result.length === 0) {
		res.status(200).json("Valid");
	} else {
		res.status(404).json(result);
	}
});

app.post("/getViableIndex", (req, res) => {
	let result = api.getViableIndex(req.body.primary, req.body.secondary);

	res.status(200).json(result.toString());
});

app.delete("/deleteAttribute", (req, res) => {
	console.log(req.body);

	let result = api.deleteAttribute(req.body.object, req.body.attribute);

	console.log(req.body.object, req.body.attribute);
	if (result === 404) {
		res.status(result).json("Attribute does not exist");
	} else {
		res.status(200).json(result);
	}
});

app.listen(3000);
