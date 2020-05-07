const express = require('express');
const router = express.Router();
const pathfinder = require('../models/Pathfinder');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let races = await pathfinder.getRaces();
  let otherRaces = await pathfinder.getOtherRaces();
  let classes = await pathfinder.getClasses();
  res.render('pathfinder/index', {title: 'Pathfinder Analysis', races: races, otherRaces: otherRaces, classes: classes});
});

module.exports = router;

/*Old code, might get used later

let typesOfPlay = pathfinder.getTOP();
let classes = pathfinder.getClasses();
let raceAndClasses = pathfinder.getRAC();
let prestigeClasses = pathfinder.getPrestigeClasses();

typesOfPlay: typesOfPlay, 
  classes: classes, races: races, raceAndClasses: raceAndClasses, 
  prestigeClasses: prestigeClasses
  */