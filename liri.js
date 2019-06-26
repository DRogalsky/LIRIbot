require("dotenv").config();

let keys = require('./key');
let Spotify = require('node-spotify-api');

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
        
    }
}

liri[command](theQuery)