const mongoose = require('../db.js')

const Schema = mongoose.Schema

const CburlSchema = new Schema({

	name: { type: String, required: true },

	memo: { type: String, default: '' },

	status: { type: Number, default:1 },

	created_at: { type: Date },

  	updated_at: { type: Date }
},
{
	versionKey: false, timestamps: { createdAt:'created_at',updatedAt:'updated_at' }
})

module.exports = mongoose.model('cburl', CburlSchema,'cburl')