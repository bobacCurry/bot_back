const mongoose = require('../db.js')

const Schema = mongoose.Schema

const BotSchema = new Schema({

	name: { type: String, required: true },

	username: { type: String, required: true, unique: true },

	token: { type: String, required: true, unique: true },
	// 机器人类型
	type: { type: String, index: true },
	// 回调域名
	cburl: { type: String, required: true },

	status: { type: Number, default:1 },

	created_at: { type: Date },

  	updated_at: { type: Date }
},
{
	versionKey: false, timestamps: { createdAt:'created_at',updatedAt:'updated_at' }
})

module.exports = mongoose.model('bot', BotSchema,'bot')