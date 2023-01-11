// import modules
var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var scheduler = require('node-schedule');


// load novel data from json file at server start
var novel;
let date;
fs.readFile(path.join(__dirname,'../public','json', 'novel.json'), 'utf8', function(err, data) {
    date = new Date().toLocaleString('ko-KR', {timeZone: 'Asia/Seoul'});
    if (err) throw err;
    novel = JSON.parse(data);
});
// load novel.json file every at am 00:00 GMT+9
scheduler.scheduleJob('0 0 0 * * *', function(){
    fs.readFile(path.join(__dirname,'../public','json', 'novel.json'), 'utf8', function(err, data){
        date= new Date().toLocaleString('ko-KR', {timeZone: 'Asia/Seoul'});
        if (err) throw err;
        novel = JSON.parse(data);
        console.log(date + " novel.json loaded");
    });
});

router.get('/', async (req, res, next) => {
    return res.render('novel', {title: '웹소설 단축어 목록', novels: novel, time: "최근 수정 일자: "+date});
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