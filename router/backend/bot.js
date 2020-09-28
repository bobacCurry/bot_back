const express = require('express')

const router = express.Router()

const { bot_get_list, bot_create, bot_edit, bot_status_change, bot_remove } = require('../../controller/backend/bot.js')

const jwt = require('../../middleware/check_token')

router.post('/bot_get_list', bot_get_list)

router.post('/bot_create', bot_create)

router.post('/bot_edit', bot_edit)

router.post('/bot_status_change', bot_status_change)

router.post('/bot_remove', bot_remove)

module.exports = router