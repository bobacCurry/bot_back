const mongoose = require('../db.js')

const Schema = mongoose.Schema

const OrderSchema = new Schema({
	// 广告id
	aid: { type: Schema.Types.ObjectId, ref:'Ads', required: true, index: true },
	// 购买时长 按照 天数 计算
	time: { type: Number, default:0 },
	// 订单备注
	memo: { type: String, default:'' },
	// 广告类型
	type: { type: Number, required: true },

	created_at: { type: Date },

  	updated_at: { type: Date }
},
{
	versionKey: false, timestamps: { createdAt:'created_at',updatedAt:'updated_at' }

})

module.exports = mongoose.model('order', OrderSchema,'order')