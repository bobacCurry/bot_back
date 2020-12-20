const mongoose = require('../db.js')

const Schema = mongoose.Schema
//管家机器人
const BulterSchema = new Schema({

	brand: { type: String, index: true },

	uid: { type: String, index: true, unique: true },
	// 广告文本
	chatname: { type: String, require: true, unique: true },

	keywords: { type: Array, default: [] },

	greet: { type: String, default: '' },

	warning: { type: String, default: '' },

	limit: { type: Array, default:[] },

	created_at: { type: Date },

  	updated_at: { type: Date }
},
{
	versionKey: false, timestamps: { createdAt:'created_at',updatedAt:'updated_at' }

})

module.exports = mongoose.model('bulter', BulterSchema,'bulter')