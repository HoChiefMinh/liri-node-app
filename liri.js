require("dotenv").config();
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);


let userAction = process.argv[2];
let userSearch = process.argv[3];

// console.log(userAction, userSearch);

switch (userAction) {
    case "concert-this":
        console.log("concert-this");
        break;

    case "spotify-this-song":
        console.log("spotify-this-song");
        break;

    case "movie-this":
        console.log("movie-this");
        break;

    case "do-what-it-says":
        console.log("do-what-it-says");
        break;

    default: 
        console.log("Input unfound");
        break;
}

