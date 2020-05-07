const express = require('express');
const router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '578 Data Visualization Project' });
});

module.exports = router;