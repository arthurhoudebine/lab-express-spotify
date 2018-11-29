const express = require('express');
const app = express();
const hbs = require('hbs');
const path    = require('path');

var SpotifyWebApi = require('spotify-web-api-node');

app.set("view engine","hbs")
app.set('views', path.join(__dirname, 'views'));
app.listen(3000, () => console.log('Example app listening on port 3000!'))

// Remember to paste your credentials here
var clientId = '48b0cb42326c47c88c4b97593078f9af',
    clientSecret = '7e7d6965cb294bf2887241fabc87cd4b';

var spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
});


app.get('/', function (req, res) {
    res.render('index')
  })

app.get('/artists', function (req, res) {
console.log(req.query)
//res.send(req.query)
spotifyApi.searchArtists(req.query.artist)
    .then(data => {
        res.render('artists',{artists:data.body.artists.items});
    })
    .catch(err => {
      console.log("error");
    })
})


