const mongoose = require('../db.js')

const Schema = mongoose.Schema

const AdsSchema = new Schema({
	// 广告文本
	text: { type: String, required: true },
	// 广告链接
	link: { type: String, default: '' },
	// 点击次数
	count: { type: Number, default: 0 },
	// 广告状态
	status: { type: Boolean, default: true },
	// 上次展示时间
	last_show: { type: Number, default:0 },
	// 广告结束时间
	end_at: { type: Number, default:0 },
	
	created_at: { type: Date },

  	updated_at: { type: Date }
},
{
	versionKey: false, timestamps: { createdAt:'created_at',updatedAt:'updated_at' }

})

module.exports = mongoose.model('ads', AdsSchema,'ads')