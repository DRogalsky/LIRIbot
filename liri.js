require("dotenv").config();

let keys = require('./key.js');

var spotify = new spotify(keys.spotify);