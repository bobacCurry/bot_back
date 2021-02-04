const mongoose = require('../db.js')

const Schema = mongoose.Schema

const AccessLogSchema = new Schema({
	
	uid: { type: Number, required: true, index: true },
	
	user: { type: Object, default:{} },

	text: { type: String, default:'' },

	keywords: { type: Array, default:[] },

	created_at: { type: Date }
},
{
	versionKey: false, timestamps: { createdAt:'created_at' }

})

module.exports = mongoose.model('access_log', AccessLogSchema,'access_log')