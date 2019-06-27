require("dotenv").config();

const keys = require('./key');
const Spotify = require('node-spotify-api');
const axios = require('axios');
const datefns = require('date-fns');
const fs = require('fs');

let spotify = new Spotify(keys.spotify);
let omdbKey = keys.omdb.key;

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
            .search({ type: 'track', query: theSong })
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

    'concert-this': function () {
        theQuery = theQuery.join(' ');
        let queryURL = "https://rest.bandsintown.com/artists/" + theQuery + "/events?app_id=codingbootcamp";
        axios.get(queryURL).then(function (response) {
            let actuallyUseful = response.data;
            let formattedTime = datefns.format(actuallyUseful[0].datetime, format = 'MM/DD/YYYY')
            console.log(
                'Venue: ' + actuallyUseful[0].venue.name + '\n',
                'City: ' + actuallyUseful[0].venue.city + '\n',
                'Country: ' + actuallyUseful[0].venue.country + '\n',
                'When: ' + formattedTime
            );
        })
    },

    'movie-this': function () {
        if (theQuery.length === 0) {
            theQuery = 'Mr.Nobody'
        }
        theQuery = theQuery.join('-')
        let queryURL = 'http://www.omdbapi.com/?t=' + theQuery + '&apikey=' + omdbKey;
        axios.get(queryURL).then(function (response) {
            let data = response.data;
            let tomatoTracker = false;
            let tomatoScore;
            for (source in data.Ratings) {
                if (data.Ratings[source].Source === 'Rotten Tomatoes') {
                    tomatoTracker = true;
                    tomatoScore = data.Ratings[source].Value;
                }
            }
            if (tomatoTracker === false) {
                tomatoScore = 'Not Available'
            }
            console.log(
                `\nTitle: ${data.Title} \n\n`,
                `Year: ${data.Year} \n\n`,
                `IMDB rating: ${data.imdbRating} \n\n`,
                `Rotten Tomatoes: ${tomatoScore} \n\n`,
                `Country(s): ${data.Country} \n\n`,
                `Language: ${data.Language} \n\n`,
                `Plot: ${data.Plot} \n\n`,
                `Actors: ${data.Actors} \n\n`

            )
        })
    },

    'do-what-it-says': function () {
        fs.readFile('random.txt', 'utf8' ,(err, data) => {
            if (err) throw err;
            let contents = data.split(',')
            let askLiri = contents[0];
            let query = contents[1].split(" ");
            liri[askLiri](query);
        });
    }
}

liri[command](theQuery)