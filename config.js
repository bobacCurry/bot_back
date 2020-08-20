const fs = require('fs')

let env = fs.readFileSync('./.env', 'utf-8') // 环境配置

env = JSON.parse(env)

let bot_api = "https://api.telegram.org/bot"

module.exports = { env, bot_api }