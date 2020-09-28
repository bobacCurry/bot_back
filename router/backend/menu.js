const express = require('express')

const router = express.Router()

const { menu_get_list, menu_create, menu_edit, menu_status_change, menu_remove } = require('../../controller/backend/menu.js')

const jwt = require('../../middleware/check_token')

router.post('/menu_get_list', menu_get_list)

router.post('/menu_create', menu_create)

router.post('/menu_edit', menu_edit)

router.post('/menu_status_change', menu_status_change)

router.post('/menu_remove', menu_remove)

module.exports = router