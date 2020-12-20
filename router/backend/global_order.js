const express = require('express')

const router = express.Router()

const { global_order_get_list, global_order_create, global_order_edit, global_order_remove, global_order_pass, global_order_refuse } = require('../../controller/backend/global_order.js')

const jwt = require('../../middleware/check_token')

router.post('/global_order_get_list', global_order_get_list)

router.post('/global_order_create', global_order_create)

router.post('/global_order_edit', global_order_edit)

router.post('/global_order_remove', global_order_remove)

router.post('/global_order_pass', global_order_pass)

router.post('/global_order_refuse', global_order_refuse)

module.exports = router