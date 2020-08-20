const mongoose = require('../db.js')

const Schema = mongoose.Schema

const CatSchema = new Schema({
	// 分类名称 多语言
	text: { type: Object, default: {} },
	// 标签
	tags: { type: Array, default:[], index: true },
	// 语言版本
	lang: { type: String, default:'cn' },
	// 排序
	sort: { type: Number, default:0 },

	created_at: { type: Date },

  	updated_at: { type: Date }
},
{
	versionKey: false, timestamps: { createdAt:'created_at',updatedAt:'updated_at' }
})

module.exports = mongoose.model('cat', CatSchema,'cat')