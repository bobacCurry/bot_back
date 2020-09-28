const express = require('express')

const router = express.Router()

const { order_get_list, order_create, order_edit, order_status_change, order_remove } = require('../../controller/backend/order.js')

const jwt = require('../../middleware/check_token')

router.post('/order_get_list', order_get_list)

router.post('/order_create', order_create)

router.post('/order_edit', order_edit)

router.post('/order_status_change', order_status_change)

router.post('/order_remove', order_remove)

module.exports = router