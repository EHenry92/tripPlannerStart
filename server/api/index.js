var express = require('express');
var router = express.Router();
var db = require("../../models").db;
var Place = require("../../models").Place;
var Hotel = require("../../models").Hotel;
var Restaurant = require("../../models").Restaurant;
var Activity = require("../../models").Activity;

router.get('/', function(req, res, next){
  Promise.all([Hotel.findAll({include: [{all: true}]}), Restaurant.findAll({include: [{all: true}]}), Activity.findAll({include: [{all: true}]})])
  .then(allPlaces => res.json(allPlaces))
  .catch(next);
})
module.exports = router;
