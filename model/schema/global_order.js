const mongoose = require('../db.js')

const Schema = mongoose.Schema

const GlobalOrderSchema = new Schema({
	// 广告id
	ads: { type: Schema.Types.ObjectId, ref:'ads', required: true, index: true },
	// 购买时长 按照 天数 计算
	day: { type: Number, default:0 },
	// 订单备注
	memo: { type: String, default:'' },

	created_at: { type: Date },

  	updated_at: { type: Date }
},
{
	versionKey: false, timestamps: { createdAt:'created_at',updatedAt:'updated_at' }
})

module.exports = mongoose.model('global_order', GlobalOrderSchema,'global_order')