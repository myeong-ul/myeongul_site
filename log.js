const fs = require('fs')
const path = require('path')
const logger = require('morgan')

logger.token('date', function (req, res) {
    return new Date().toLocaleString('ko-KR', {timeZone: 'Asia/Seoul'})
});

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'log', new Date().toISOString().split("T")[0] + ".log"),
    {flags: 'a'}
)
const format = ":date || :remote-addr :remote-user :method :url HTTP/:http-version :status - :response-time ms :referrer :user-agent"
const log = logger(format, {stream: accessLogStream})

module.exports = log