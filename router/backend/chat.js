const express = require('express')

const router = express.Router()

const { chat_get_list, chat_create, chat_edit, chat_remove } = require('../../controller/backend/chat.js')

const jwt = require('../../middleware/check_token')

router.post('/chat_get_list', chat_get_list)

router.post('/chat_create', chat_create)

router.post('/chat_edit', chat_edit)

router.post('/chat_remove', chat_remove)

module.exports = router