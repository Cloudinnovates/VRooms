// Require our dependencies
const express = require("express");
const mongoose = require("mongoose");
const bluebird = require("bluebird");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const path = require("path");
const fs = require('fs');
require('dotenv').config();

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");
const session = require("express-session");

const apiRoutes = require("./routes/apiRoutes");
const loginRoutes = require("./routes/loginRoutes");

const cheerio = require("cheerio");
const request = require('request');
const axios = require('axios');
let parseString = require('xml2js').parseString; 

// AWS S3 initialization
const AWS = require("aws-sdk");
const S3 = new AWS.S3({
	signatureVersion: "v4",
	region: "us-west-1"
});
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

// Import Zillow dependency and initiate
const zillow_key = process.env.ZILLOW_KEY;
// let Zillow = require('node-zillow');
// let zillow = new Zillow(zillow_key);

// Set up a default port, configure mongoose, configure our middleware
const PORT = process.env.PORT || 5000;
mongoose.Promise = bluebird;
const app = express();

// Set Body Parser
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(cookieParser());
app.use(session({
    secret: "shhsecret",
    resave: true,
    saveUninitialized: false,
	cookie: { httpOnly: false }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require("./controllers/config/passport")(passport);

// Route to serve gzipped bundle.js file.
// IMPORTANT: This NEEDS to be higher-priority than the static route
if(process.env.NODE_ENV === 'production') {
	app.get("*/bundle.js", function (req, res, next) {
		req.url = req.url + ".gz";
		res.set("Content-Encoding", "gzip");
		res.set("Content-Type", "text/javascript");
		next();
	});
}

app.use(express.static(__dirname + "/public"));

app.use("/", loginRoutes);

// API-related routes (maybe relocated in future)
app.post('/fetch-listing', (req,res) => {
	console.log('>>> POST /fetch-listing (server.js)');
	// const zpid = 48749425;
	let zpid = req.body;
	console.log('zpid',zpid);
	let qURL =`http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?zws-id=${zillow_key}&zpid=${zpid}`;
	// console.log('qURL',qURL);

	axios.get(qURL)
	.then( (results) => {
		let raw = results.data;
		// console.log('raw',raw);
		// console.log('typeof raw',typeof raw);
		parseString(raw, (err,result) => {
			// console.log('result',result);
			let resultObj = result['UpdatedPropertyDetails:updatedPropertyDetails'];
			let message = resultObj.message[0].text[0].trim();
			// console.log('resultObj',resultObj);
			console.log('message',message);

			if (message == 'Request successfully processed'){
				let isolatedResponse = resultObj.response[0];
				console.log('isolateResponse',isolatedResponse);
				res.json(isolatedResponse)
			}
			else {
				res.send(message)
			}
		})
		// console.log('data',data);
		// res.json(data);
	})
});

// Route to serve S3 signed request to client 
app.post('/sign-s3', (req, res) => {
	// console.log("ID: ", process.env.AWS_ACCESS_KEY_ID);
	// console.log("KEY: ", process.env.AWS_SECRET_ACCESS_KEY);
	console.log(">>> /sign-s3");
	console.log("req.body: ", req.body);
	const fileName = req.body.fileName;
	const fileType = req.body.fileType;

	let path = fileName; // Set path to /userName/fileName once we get user info

	const s3Params = {
		Bucket: BUCKET_NAME,
		Key: path,
		Expires: 60,
		ACL: "public-read"
	};

	S3.getSignedUrl('putObject', s3Params, (err, data) => {
		if (err) {
			console.log(err);
			res.status(500).send();
		} else {
			const returnData = {
				signedRequest: data,
				url: `https://${BUCKET_NAME}.s3.amazonaws.com/${fileName}`
			};
			console.log("returnData: ", returnData);
			res.json(returnData);
		}
	});
});

// Default React route
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Change the MongoDB URI depending on environment.
let db = "mongodb://localhost/vroomsDB";
// const db = process.env.MONGODB_URI || "mongodb://localhost/vroomsDB";
if (process.env.NODE_ENV === 'production') {
	db = process.env.MONGODB_URI
}

// Connect mongoose to our database
mongoose.connect(db, error => {
    // Log any errors connecting with mongoose
    if (error) {
        console.error(error);
    } else {
        // Or log a success message
        console.log("mongoose connection is successful");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log("Now listening on port %s!", PORT);
});