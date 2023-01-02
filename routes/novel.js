var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

var novel;
fs.readFile(path.join(__dirname,'../public','json', 'novel.json'), 'utf8', function(err, data) {
    if (err) throw err;
    novel = JSON.parse(data);
});

router.get('/', async (req, res) => {

    res.render('novel', { title: '웹소설 단축어 목록', novels: novel});
});

module.exports = router;