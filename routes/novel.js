// import modules
var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var scheduler = require('node-schedule');

// load novel data from json file at server start
var novel;
fs.readFile(path.join(__dirname,'../public','json', 'novel.json'), 'utf8', function(err, data) {
    if (err) throw err;
    novel = JSON.parse(data);
});
// load novel.json file every at am 00:00 GMT+9
const schedule = scheduler.scheduleJob('0 0 0 * * *', function(){
    fs.readFile(path.join(__dirname,'../public','json', 'novel.json'), 'utf8', function(err, data){
        if (err) throw err;
        novel = JSON.parse(data);
        console.log("novel.json loaded");
    });
});
//Set Month
const month = {
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
router.get('/', async (req, res, next) => {
    var dates=schedule.nextInvocation().toString().split(' ');
    var days=(Number(dates[2])-1).toString();
    if (days.length===1) days='0'+days;
    dates = "최근 수정 시각: "+dates[3] + '-' + month[dates[1]] + '-' + days + '-' + dates[4];
    return res.render('novel', {title: '웹소설 단축어 목록', novels: novel, time: dates});
});
// const cartegory = ['123','abc','ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ','ㄲ','특수문자'];
// var id = 0;
// router.get('/editer', async (req, res, next) => {
//     var novel_list = [];
//     for(var i in novel) {
//         for (var j in novel[i]["novel"]) {
//             novel_list.push(novel[i]["novel"][j]);
//         }
//     }
//     return res.render('editer', {title: '웹소설 단축어 목록 수정',id: id, novels: novel_list,cartegories: cartegory});
// });
// router.post('/edit', async (req, res, next) => {
//     var novel = req.body;
//     var json = JSON.stringify(novel);
//     fs.writeFile(path.join(__dirname,'../request', ++id + ".json"), json, 'utf8', function(err){
//         if (err) throw err;
//         console.log("Get request from "+req.socket.remoteAddress.toString());
//     });
//     return res.redirect('/novel');
// });

module.exports = router;