var keys = require("./keys.js");

var Twitter = require('twitter');

var spotify = require('spotify');

var callTweets = function() {
var client = new Twitter(keys.twitterKeys);
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log(" ");
        console.log(tweets[i].text);
        
    }
  }

});
}

var useSpotify = function(songName){
 
spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
var songs = data.tracks.items;
for (var i = 0; i < songs.length; i++) {
    console.log(i);
    console.log("artist(s):" + songs[i].artists.map(getArtistName));
    console.log('song name:'+ songs[i].name);
    console.log('preview songs:'+ songs[i].preview_url);
    console.log('album:'+ songs[i].album.name);
    console.log('---------------------------------------')
        
};
})
    
}

var movieList = function(movieName)

{request("http://wwwomdbapi.com/t="+ movieName +"&y=&plot=short&r=json",function(error,response,body){
    if(!error && response.statusCode == 200){
        var jsonData = JSON.parse(body);
        console.log('Tittle:' + jsonData.Tittle);
        console.log('Year:'+ jsonData.Year);
        console.log('Rated:'+ jsonData.Rated);
        console.log('IMDB Ratings:' + jsonData.imdbRating);
        console.log('Country:'+ jsonData.country);
        console.log('Language:' + jsonData.Language);
        console.log('Plot:'+ jsonData.Plot);
        console.log('Actors:'+ jsonData.Actors);
        console.log('Rotten tomatoes rating:' + jsonData.tomatoRating);
        console.log('Rotten tomatoes URL:'+ jsonData.tomatoURL)
    }
})}



var select = function (caseData,functionData){
    switch (caseData) {
        case "my-tweets":
        callTweets();
            break;
            case "spotify-this-song":
        useSpotify(functionData);
            break;
              case "movie-this":
        movieList(functionData);
        
        default:
           console.log("Liri does not know that");
    }
}
var runThis = function(argOne,argTwo){
    select(argOne,argTwo);
};
runThis(process.argv[2],process.argv[3]);