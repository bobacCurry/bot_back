const Model = require('../common/model')

const db_filter = require('../../model/schema/filter.js')

const jwt = require('../../middleware/check_token')

const { page_helper, change_local_date } = require('../common/helpers')

module.exports = {
	filter_get_list: async (req, res, next) => {

		let { page = 1, size = 10, conditions = {} } = req.body

		let page_info = page_helper(page, size);

		let _conditions = {}
		if (conditions.date && conditions.date[0] && conditions.date[1]){
			_conditions.created_at = {
				"$lte": conditions.date[1],
				"$gte":conditions.date[0],
			}
		}
		if (conditions.type && conditions.keywords){
			let regexp=new RegExp(conditions.keywords,'i')
			_conditions[conditions.type] = {$regex:regexp}
		}
		let find_fields = {}

		let find_options = {
			skip:page_info.skip,
			limit:page_info.limit,
			sort: {_id: -1}
		}
		let filter_list = await Model.findData(db_filter,_conditions,find_fields,find_options).then((result)=>{
			return result
		}).catch(err => {
			return next(new Error(err))
		})
		filter_list = change_local_date(filter_list)

		let filter_count = await Model.countData(db_filter,_conditions).then((result)=>{
			return result
		}).catch(err => {
			return next(new Error(err))
		})

		return res.send({ success: true, filter_list: filter_list, filter_count: filter_count })

	},

	filter_create: async (req, res, next) => {

		let data = req.body

		Model.addData(db_filter,data).then((result)=>{

			return res.send({ success: true, data: result, msg: '创建成功' })

		}).catch(err => {

			return next(new Error(err))

		})

	},

	filter_edit: async (req, res, next) => {

		let data = req.body

		let conditions = {
			_id: data._id
		}

		let options = {
			new: true
		}
		let return_data = await Model.findOneAndUpdateData(db_filter, conditions, data, options).then((result)=>{

			return change_local_date(result.toObject())

		}).catch(err => {

			return next(new Error(err))

		})

		return res.send({ success: true, data: return_data, msg: '修改成功' })

	},

	filter_remove: async (req, res, next) => {

		let data = req.body

		let conditions = {
			_id: data.id
		}

		Model.removeData(db_filter, conditions).then((result)=>{

			return res.send({ success: true, msg: '已删除' })

		}).catch(err => {

			return next(new Error(err))

		})

	}
}