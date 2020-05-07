const express = require('express');
const router = express.Router();
const DND = require('../models/DND');
const dbService = require('../services/DB');

/* GET home page. */
router.get('/', async function(req, res, next) {
    let racesCount = await DND.countRaces();
    let classCount = await DND.countClasses();
    let rangerCount = await DND.countRanger();
    let alignmentCount = await DND.countAlignment();
    let backgroundCount = await DND.countBackground();

    let lg = [], ln = [], le = [], ng = [], n = [], ne = [], cg = [], cn = [], ce = [], titles = [];
    let alignmentMatrix = await DND.countAlignmentMatrix();
    /*for(let i = 0; i<alignmentMatrix.length; i++){
        console.log(alignmentMatrix[i]);
    }*/
    titles = alignmentMatrix[0];
    lg = alignmentMatrix[1];
    ln = alignmentMatrix[2];
    le = alignmentMatrix[3];
    ng = alignmentMatrix[4];
    n = alignmentMatrix[5];
    ne = alignmentMatrix[6];
    cg = alignmentMatrix[7];
    cn = alignmentMatrix[8];
    ce = alignmentMatrix[9];
    //let fillMongo = DND.fillMongo();
    console.log(alignmentMatrix);
    console.log(ce);
    
  res.render('dnd/index', { title: 'Express', raceCount: racesCount, classCount: classCount, rangerCount: rangerCount, alignmentMatrix: alignmentMatrix, alignmentCount: alignmentCount, backgroundCount: backgroundCount,
        lg: lg, ln: ln, le: le, ng: ng, n: n, ne: ne, cg: cg, cn: cn, ce: ce, titles: titles});
});

module.exports = router;