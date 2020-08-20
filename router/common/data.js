const express = require('express')

const router = express.Router()

const jwt = require('../../middleware/check_token')

const file = require('../../controller/common/file')

router.post('/upload_image', jwt.decode, file.upload_file) // 上传文件

module.exports = router