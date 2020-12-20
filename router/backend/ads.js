const express = require('express')

const router = express.Router()

const { ads_get_list, ads_create, ads_edit, ads_remove } = require('../../controller/backend/ads.js')

const jwt = require('../../middleware/check_token')

router.post('/ads_get_list', ads_get_list)

router.post('/ads_create', ads_create)

router.post('/ads_edit', ads_edit)

router.post('/ads_remove', ads_remove)

module.exports = router