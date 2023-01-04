const fs = require('fs')
const path = require('path')
const logger = require('morgan')

process.env.TZ = 'Asia/Seoul'
const red = "\x1B[31m",
    green = "\x1b[32m",
    yellow = "\x1b[33m",
    cyan = "\x1b[36m",
    white = "\x1B[37m",
    endColor = "\033[0m",
    blue = "\x1b[34m";
logger.token('remote-addr', function (req, res) {
    return blue + req.socket.remoteAddress + endColor;
});
logger.token('date', function (req, res) {
    let d = new Date();
    let date = new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString().replace(/T/, ' ').split(' ');
    if (Number(date[0].split('-')[2])%2 === 0) date = date[0] + green + " " + date[1] + endColor
    else date = date[0] + cyan + " " + date[1] + endColor
    return date
});
logger.token('status', function (req, res) {
    let color
    if (res.statusCode >= 500) color = red;
    else if (res.statusCode >= 400) color = yellow;
    else if (res.statusCode >= 300) color = cyan;
    else if (res.statusCode >= 200) color = green;
    else color = white;
    return color + res.statusCode + endColor;
});
logger.token('method', function (req, res) {
    let color
    if (req.method === 'GET') color = green;
    else if (req.method === 'POST') color = yellow;
    else if (req.method === 'DELETE') color = red;
    else color = white;
    return color + req.method + endColor;
});
logger.token('url', function (req, res) {
    return req.originalUrl;
});

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'log', new Date().toISOString().split("T")[0] + ".ans"),
    {flags: 'a'}
)
const log = logger('[:remote-addr] [:date[web]] :method :url :status :response-time ms', {stream: accessLogStream})

module.exports = log