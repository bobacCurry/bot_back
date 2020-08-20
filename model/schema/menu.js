const mongoose = require('../db.js')

const Schema = mongoose.Schema

const MenuSchema = new Schema({
	// 按钮标题 多语言
	text: { type: Object, default: {} },
	// 按钮路径
	path: { type: String, required: true },
	// 按钮排序
	sort: { type: Number, default: 0 },
	// 按钮大小
	width: { type: Number, default: 0 },
	// 按钮层级
	level: { type: Number, default: 0 },
	// 按钮状态
	status: { type: Number, default: 0 }
},
{
	versionKey: false

})

module.exports = mongoose.model('menu', MenuSchema,'menu')