require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("node:https");
const { json } = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;

	const data = {
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName,
				},
			},
		],
	};

	const jsonData = JSON.stringify(data);
	const url = URL;

	const options = {
		method: "POST",
		auth: AUTH,
	};

	const request = https.request(url, options, function (response) {
		if (response.statusCode === 200) {
			res.sendFile(__dirname + "/success.html");
		} else {
			res.sendFile(__dirname + "/failure.html");
		}

		response.on("data", (data) => {
			console.log(JSON.parse(data));
			// console.log(data.error_count);
		});
	});

	app.post("/failure", (req, res) => {
		res.redirect("/");
	});

	request.write(jsonData);
	// console.log(request.error_count);
	request.end();
	// console.log(jsonData);

	// console.log(firstName, lastName, email);
});

app.listen(port, () => {
	console.log("Server is running on port 3000.");
});

// API Key newsletter signup
// d9b969b1349c11f53c21ea2be5942d5a-us21

// List ID
// 501e338d11
