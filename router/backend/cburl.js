const express = require('express')

const router = express.Router()

const { cburl_get_list, cburl_create, cburl_edit, cburl_status_change, cburl_remove } = require('../../controller/backend/cburl.js')

const jwt = require('../../middleware/check_token')

router.post('/cburl_get_list', cburl_get_list)

router.post('/cburl_create', cburl_create)

router.post('/cburl_edit', cburl_edit)

router.post('/cburl_status_change', cburl_status_change)

router.post('/cburl_remove', cburl_remove)

module.exports = router