const express = require('express')

const router = express.Router()

const { filter_get_list, filter_create, filter_edit, filter_remove } = require('../../controller/backend/filter.js')

const jwt = require('../../middleware/check_token')

router.post('/filter_get_list', filter_get_list)

router.post('/filter_create', filter_create)

router.post('/filter_edit', filter_edit)

router.post('/filter_remove', filter_remove)

module.exports = router