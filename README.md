# LIRIbot
A CLI that can find information on bands, movie, and songs. 

## Getting Started
To get started using LIRIbot you must clone a copy of the repository to your computer by using the green clone button above the files section of the repo. After that open node, navigate to the directory, and type `npm install` in the command line. Then you must make a file named .env (nothing before the dot) and put in your spotify API ID and Secret as SPOTIFY_ID and SPOTIFY_SECRET. You will also need an omdb ID set to OMDB_KEY.

```
# Spotify API keys

SPOTIFY_ID=YOUR_ID_HERE
SPOTIFY_SECRET=YOUR_SECRET_HERE

#omdb API key

OMDB_KEY=YOUR_OMDB_KEY_HERE
```

After that you should be ready to use the program.

## Usage
LIRIbot has 4 commands:

### spotify-this-song

This command takes a song title and brings you back:
   * Artists
   * The Song Title
   * Spotify Preview Link
   * Album Name

![Image of Command line](/images/Spotifyscreen.png)

### concert-this

This command takes a band name and brings you back:
   * The Venue of their next show
   * The City where the show is located.
   * The Country where the show is located.
   * The Date of the show.

![Image of Command line](/images/BandsScreen.png)

### movie-this

This command takes in a movie title and returns:
   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.

![Image of Command line](/images/OMDBscreen.png)

### do-what-it-says

This command reads whatever is in the random.txt folder and reads it as long as it's in the format of `action,"Title"`

![Image of Command line](/images/RandomScreen.png)

![Image of Notepad](/images/notepadScreen.png)

## Packages Used
   * axios
   * date-fns
   * dotenv
   * moment
   * node-spotify-api

## APIs used
   * Spotify
   * OMDB
   * Bands in Town

## Author
Daniel Rogalsky