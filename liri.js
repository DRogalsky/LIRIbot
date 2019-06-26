require("dotenv").config();

const keys = require('./key');
const Spotify = require('node-spotify-api');
const axios = require('axios');
const datefns = require('date-fns');

let spotify = new Spotify(keys.spotify);

let command = process.argv[2];

let theQuery = process.argv.slice(3);
var liri = {
    "spotify-this-song": function (theSong) {
        if (theSong.length === 0) {
            theSong = "The Sign"
            console.log(theSong);
        }
        console.log('Let me get that information for you.')
        spotify
            .search({type: 'track', query: theSong})
            .then(function (data) {
                console.log(
                    `Artist: ${data.tracks.items[0].artists[0].name}\n`,
                    `Album: ${data.tracks.items[0].album.name}\n`,
                    `Song: ${data.tracks.items[0].name} \n`,
                    `Preview: ${data.tracks.items[0].preview_url} \n`
                );
            })
            .catch(function (err) {
                console.log('Error occurred: ' + err);
            })
    },

    'concert-this': function() {
        theQuery = theQuery.join(' ');
        let queryURL = "https://rest.bandsintown.com/artists/" +  theQuery + "/events?app_id=codingbootcamp";
        axios.get(queryURL).then(function(response) {
            let actuallyUseful = response.data;
            let formattedTime = datefns.format(actuallyUseful[0].datetime, format='MM/DD/YYYY')
            console.log(
                actuallyUseful[0].venue.name + '\n',
                actuallyUseful[0].venue.city + '\n',
                actuallyUseful[0].venue.country + '\n',
                formattedTime
                );
        })
    },

    'movie-this': function() {

    },

    'do-what-it-says': function() {
        
    }
}

liri[command](theQuery)