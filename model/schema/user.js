const mongoose = require('../db.js')

const Schema = mongoose.Schema

const UserSchema = new Schema({

	account: { type: String, required: true,unique: true },

	password: { type: String, required: true },

	avatar: { type: String, default:'http://m.imeitou.com/uploads/allimg/2019031709/eoyjh4zwlxd.jpg' },

	name: { type: String, default:'新用户' },
	//权限
	access: { type: Array, default:[] },

	status: { type: Number, default:1 },

	created_at: { type: Date },

  	updated_at: { type: Date }
},
{

	versionKey: false, timestamps: { createdAt:'created_at',updatedAt:'updated_at' }

})

module.exports = mongoose.model('user', UserSchema,'user')