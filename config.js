const fs = require('fs')

let env = fs.readFileSync('./.env', 'utf-8') // 环境配置

env = JSON.parse(env)

let BOTAPI = "https://api.telegram.org/bot"
//语言列表
let LANGLIST = ['cn','en']

module.exports = { env, BOTAPI, LANGLIST }