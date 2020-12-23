"use strict";

const api = require("./ApiFunctions.js");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/validateInput", (req, res) => {
	console.log("server called");

	let result = api.validate(req.body.form, req.body.rules);

	if (result === undefined || result.length === 0) {
		res.status(200).send("Valid");
	} else {
		res.status(404).send(result);
	}
});

app.post("/getViableIndex", (req, res) => {
	let result = api.getViableIndex(req.body.primary, req.body.secondary);

	res.status(200).send(result.toString());
});

app.delete("/deleteAttribute", (req, res) => {
	let result = api.deleteAttribute(req.body.object, req.body.attribute);

	if (result === 404) {
		res.status(result).send("Attribute does not exist");
	} else {
		res.status(200).send(result);
	}
});

app.listen(3000);
