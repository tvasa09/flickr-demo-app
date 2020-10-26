var express = require('express');
var router = express.Router();
var Flickr = require('flickr-sdk');
var flickr = new Flickr('ea922625213f6d621d24879e824411af');
var feeds = new Flickr.Feeds();

/**
 * Get allpublic feeds
 */
router.get('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  feeds.publicPhotos()
    .then(function (response) {
      res.send(response.body);
    }).catch(function (err) {
      console.error('bonk', err);
    });
});

/**
 * Get all searched images feed
 */
router.get('/search/:searchText', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  flickr.photos.search({
    text: req.params.searchText
  }).then(function (response) {
    res.send(response.body);
  }).catch(function (err) {
    console.error('bonk', err);
  });
});

module.exports = router;