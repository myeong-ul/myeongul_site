var express = require('express');
const path = require("path");
var router = express.Router();

/* GET render page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: '명울에 대하여' });
});

router.get('/img/:img', async (req, res) => {
  res.sendFile(path.join(__dirname, '..','public', 'images', req.params.img));
});

router.get('/css/:css', async (req, res) => {
  res.sendFile(path.join(__dirname, '..','public', 'stylesheets', req.params.css));
});

//export router
module.exports = router;
