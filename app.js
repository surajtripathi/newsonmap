"use strict";
var request = require("request");
var http = require("http");
var express = require("express");
var parser = require("xml2json");

var app = express()

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile('public/index.html', { "root": __dirname })
})

app.get("/rssfeed", function (req, res) {
	request('http://www.thehindu.com/news/cities/?service=rss', function (error, response, body) {
	  var json_data = parser.toJson(body);
	  res.json(JSON.parse(json_data));
	});
});

var port = process.env.PORT || 5000;
app.listen(5000, function () {
  console.log("Example app listening on port 3000!")
})
