const mongoose = require('../db.js')

const Schema = mongoose.Schema

const KeywordsOrderSchema = new Schema({
	// 广告id
	chat: { type: Schema.Types.ObjectId, ref:'chat', required: true, index: true },
	// 购买时长 按照 天数 计算
	day: { type: Number, default:0 },
	// 订单备注
	keywords:{ type: Array, default:[] },

	created_at: { type: Date },

  	updated_at: { type: Date }
},
{
	versionKey: false, timestamps: { createdAt:'created_at',updatedAt:'updated_at' }
})

module.exports = mongoose.model('keywords_order', KeywordsOrderSchema,'keywords_order')