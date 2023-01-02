var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var scheduler = require('node-schedule');

var novel;
fs.readFile(path.join(__dirname,'../public','json', 'novel.json'), 'utf8', function(err, data) {
    if (err) throw err;
    novel = JSON.parse(data);
});

const schedule = scheduler.scheduleJob('0 0 0 */1 * *', function(){
    fs.readFile(path.join(__dirname,'../public','json', 'novel.json'), 'utf8', function(err, data){
        if (err) throw err;
        novel = JSON.parse(data);
        console.log("novel.json updated");
    });
});
month = {
    'Jan': '01',
    'Feb': '02',
    'Mar': '03',
    'Apr': '04',
    'May': '05',
    'Jun': '06',
    'Jul': '07',
    'Aug': '08',
    'Sep': '09',
    'Oct': '10',
    'Nov': '11',
    'Dec': '12'
}
router.get('/', async (req, res) => {
    var dates=schedule.nextInvocation().toString().split(' ');
    var days=(Number(dates[2])-1).toString();
    if (days.length===1) days='0'+days;
    dates = "최근 수정 시각: "+dates[3] + '-' + month[dates[1]] + '-' + days + '-' + dates[4];
    res.render('novel', {title: '웹소설 단축어 목록', novels: novel, time: dates});
});

module.exports = router;