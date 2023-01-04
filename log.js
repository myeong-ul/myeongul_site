const fs = require('fs')
const path = require('path')

const uptime = new Date().toISOString().split('T')[0]+'.log'

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'log',uptime),
    { flags: 'a' }
)

module.exports = accessLogStream