require("dotenv").config();
const axios = require('axios');
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);


let userAction = process.argv[2];
let userSearch = process.argv[3];

// console.log(userAction, userSearch);

//switch statements used when looking at one variable (userAction) and gives 4 options
switch (userAction) {
    case "concert-this":
        findConcert();
        break;

    case "spotify-this-song":
        songSearch();
        break;

    case "movie-this":
        movieSearch()
        break;

    case "do-what-it-says":
        justDoIt()
        break;

    default:
        console.log("Input unfound");
        break;
}

function findConcert() {
    console.log("concert-this", userSearch);

    const queryURL = "https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp"

    axios.get(queryURL)
  .then(function (response) {
    // handle success
    let concertArray = response.data
    // console.log(concertArray[0]);
    console.log(concertArray[0].venue.name);
    console.log(concertArray[0].venue.city);
    // loop over concert array and console.log venue info for first five
  })

  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

function songSearch() {
    console.log("spotify-this-song", userSearch);

}

function movieSearch() {
    console.log("movie-this", userSearch);
}

function justDoIt() {
    console.log("do-what-it-says");
}