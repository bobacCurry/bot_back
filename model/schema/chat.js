const mongoose = require('../db.js')

const Schema = mongoose.Schema

const ChatSchema = new Schema({
	// 群名称
	title: { type: String, required: true },
	// 群描述
	description: { type: String, default: '' },
	// 群名称
	username: { type: String, required: true, index: true, unique: true },
	// 类型 supergroup channel
	type: { type: String, default: 'supergroup' },
	// 成员数量
	member_count: { type: Number, default: 0 },
	// 语言
	lang: { type: String, default: 'cn', index: true },
	// 权重
	score: { type: Number, default: 0, index: true },
	// 广告关键词
	keywords: { type: Array, default:[], index: true },
	// 广告结束时间
	end_at: { type: Number, default: 0 },

	created_at: { type: Date },

  	updated_at: { type: Date }
},
{
	versionKey: false, timestamps: { createdAt:'created_at',updatedAt:'updated_at' }

})

module.exports = mongoose.model('chat', ChatSchema,'chat')