const express = require('express')

const router = express.Router()

const { cat_get_list, cat_create, cat_edit, cat_status_change, cat_remove } = require('../../controller/backend/cat.js')

const jwt = require('../../middleware/check_token')

router.post('/cat_get_list', cat_get_list)

router.post('/cat_create', cat_create)

router.post('/cat_edit', cat_edit)

router.post('/cat_status_change', cat_status_change)

router.post('/cat_remove', cat_remove)

module.exports = router