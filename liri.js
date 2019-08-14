// Read and set environment variables
require("dotenv").config();

// variables
const axios = require('axios');
let request = require('request');
let moment = require('moment'); //Both required to use moment for node
moment().format();
let fs = require('fs');
let keys = require('./keys.js');
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);

//vars to capture user inputs.
let userAction = process.argv[2];
let userSearch = process.argv[3];

// UserInputs(userAction, userSearch);

//switch statements used when looking at one variable (userAction) and gives 4 options
// function UserInputs(userAction, userSearch){
switch (userAction) {
    case 'concert-this':
        findConcert(userSearch);
        break;

    case 'spotify-this-song':
        songSearch(userSearch);
        break;

    case 'movie-this':
        movieSearch(userSearch);
        break;

    case 'do-what-it-says':
        justDoIt(userSearch);
        break;

    default:
        console.log("Invalid Option. Please type and of the following options: \nconcert-this \nspotify-this-song \ndo-what-it-says");
}

function findConcert(userSearch) {
    // console.log("concert-this", userSearch);

    axios.get("https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp")
        .then(function (response) {
            console.log(response);
            for (let i = 0; i < 5; i++) {

                let datetime = response.data[i].datetime; //Saves datetime response into a variable
                let dateArr = datetime.split('T'); //Attempting to split the date and time in the response

                let concertInfo =
                    '------------------Concert Info-------------------' +
                    '\nVenue: ' + response.data[i].venue.name +
                    '\nLocation: ' + response.data[i].venue.city +
                    '\nDate: ' + (dateArr[0]);
                console.log(concertInfo);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

function songSearch(userSearch) {
    if (!userSearch) {
        userSearch = "The Sign";
    }
    spotify.search({ type: 'track', query: userSearch })
        .then(function (response) {
            for (var i = 0; i < 5; i++) {
                var spotifyResults =
                    "--------------------------------Songs------------------------------------" +
                    "\nArtist(s): " + response.tracks.items[i].artists[0].name +
                    "\nSong Name: " + response.tracks.items[i].name +
                    "\nAlbum Name: " + response.tracks.items[i].album.name +
                    "\nPreview Link: " + response.tracks.items[i].preview_url;

                console.log(spotifyResults);
            }
        })
        .catch(function(err) {
            console.log(err);
        });
    }

function movieSearch(userSearch) {

    axios.get("http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {

            let movieInfo =
                '-----------Movie Info------------' +
                '\nTitle: ' + response.data.Title +
                '\nYear: ' + response.data.Year +
                '\nIMDB Rating: ' + response.data.imdbRating +
                '\nRotten Tomatoes Rating: ' + response.data.Ratings[1].Value +
                '\nCountry: ' + response.data.Country +
                '\nLanguage: ' + response.data.Language +
                '\nPlot: ' + response.data.Plot +
                '\nActor: ' + response.data.Actors;
            console.log(movieInfo);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

//function for reading out of random.txt file  
function justDoIt() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var dataArr = data.split(',');
        UserInputs(dataArr[0], dataArr[1]);
    });
}
