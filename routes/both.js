const express = require('express');
const router = express.Router();
const DND = require('../models/DND');
const pathfinder = require('../models/Pathfinder');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let pathClasses = await pathfinder.getClasses();
  let dndClasses = await DND.countClasses();
  let dndRaces = await DND.countRaces();
  let pathRaces = await pathfinder.getRaces();

  res.render('both/index', { title: 'DND and Pathfinder Analysis', pathClasses: pathClasses, dndClasses: dndClasses, dndRaces: dndRaces, pathRaces: pathRaces});
});

module.exports = router;
