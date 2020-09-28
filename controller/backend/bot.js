const Model = require('../common/model')

const db_bot = require('../../model/schema/bot.js')

const jwt = require('../../middleware/check_token')

const { page_helper, change_local_date } = require('../common/helpers')

module.exports = {
	bot_get_list: async (req, res, next) => {

		let { page = 1, size = 10, conditions = {} } = req.body

		let page_info = page_helper(page, size);

		let _conditions = {
			status: { $in: [0, 1] }
		}
		if (conditions.date && conditions.date[0] && conditions.date[1]){
			_conditions.created_at = {
				"$lte": conditions.date[1],
				"$gte":conditions.date[0],
			}
		}
		if (conditions.type && conditions.keywords){
			let regexp=new RegExp(conditions.keywords,'i')
			if(['name','username','token','type'].includes(conditions.type)){
				_conditions[conditions.type] = {$regex:regexp}
			}else{
				_conditions[conditions.type] = conditions.keywords
			}
		}

		let find_fields = {}
		let find_options = {
			skip:page_info.skip,
			limit:page_info.limit,
			sort: {_id: -1}
		}
		let bot_list = await Model.findData(db_bot,_conditions,find_fields,find_options).then((result)=>{
			return result
		}).catch(err => {
			return next(new Error(err))
		})
		bot_list = change_local_date(bot_list)

		let bot_count = await Model.countData(db_bot,_conditions).then((result)=>{
			return result
		}).catch(err => {
			return next(new Error(err))
		})

		return res.send({ success: true, bot_list: bot_list, bot_count: bot_count })

	},

	bot_create: async (req, res, next) => {

		let data = req.body

		Model.addData(db_bot,data).then((result)=>{

			return res.send({ success: true, data: result, msg: '创建成功' })

		}).catch(err => {

			return next(new Error(err))

		})

	},

	bot_edit: async (req, res, next) => {

		let data = req.body

		let conditions = {
			_id: data._id
		}

		let options = {
			new: true
		}
		let return_data = await Model.findOneAndUpdateData(db_bot, conditions, data, options).then((result)=>{

			return change_local_date(result.toObject())

		}).catch(err => {

			return next(new Error(err))

		})

		return res.send({ success: true, data: return_data, msg: '修改成功' })

	},

	bot_status_change: async (req, res, next) => {

		let { id_list, status } = req.body

		let conditions = {
			_id: id_list
		}
		let update = {
			status: status
		}
		let options = {
			multi: true
		}

		Model.updateData(db_bot, conditions, update , options).then((result)=>{

			return res.send({ success: true, msg: '修改成功' })

		}).catch(err => {

			return next(new Error(err))

		})

	},

	bot_remove: async (req, res, next) => {

		let data = req.body

		let conditions = {
			_id: data.id
		}

		Model.removeData(db_bot, conditions).then((result)=>{

			return res.send({ success: true, msg: '已删除' })

		}).catch(err => {

			return next(new Error(err))

		})

	}
}