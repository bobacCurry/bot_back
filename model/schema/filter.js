const mongoose = require('../db.js')

const Schema = mongoose.Schema

const FilterSchema = new Schema({
	
	word: { type: String, required: true, index: true },
	
	created_at: { type: Date },

  	updated_at: { type: Date }
},
{
	versionKey: false, timestamps: { createdAt:'created_at',updatedAt:'updated_at' }

})

module.exports = mongoose.model('filter', FilterSchema,'filter')