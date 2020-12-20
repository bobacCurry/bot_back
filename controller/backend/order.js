const Model = require('../common/model')

const db_order = require('../../model/schema/order.js')

const jwt = require('../../middleware/check_token')

const { page_helper, change_local_date } = require('../common/helpers')

module.exports = {
	order_get_list: async (req, res, next) => {

		let { page = 1, size = 10, conditions = {} } = req.body

		let page_info = page_helper(page, size);

		let _conditions = {},
			pop_conditions = {}
		if (conditions.date && conditions.date[0] && conditions.date[1]){
			_conditions.created_at = {
				"$lte": conditions.date[1],
				"$gte":conditions.date[0],
			}
		}
		if (conditions.type && conditions.keywords){
			let regexp=new RegExp(conditions.keywords,'i')
			if(['memo'].includes(conditions.type)) {
				_conditions[conditions.type] = {$regex:regexp}
			}else {
				_conditions[conditions.type] = conditions.keywords
			}
		}

		let find_fields = {}
		let find_options = {
			skip:page_info.skip,
			limit:page_info.limit,
			sort: {_id: -1}
		}
		let path = 'aid'

		let order_list = await Model.findDataPopulation(db_order,_conditions,find_fields,find_options,path).then((result)=>{
			return result
		}).catch(err => {
			return next(new Error(err))
		})
		order_list = change_local_date(order_list)

		let order_count = await Model.countData(db_order,_conditions).then((result)=>{
			return result
		}).catch(err => {
			return next(new Error(err))
		})

		return res.send({ success: true, order_list: order_list, order_count: order_count })

	},

	order_create: async (req, res, next) => {

		let data = req.body,
			path = 'aid'

		Model.addDataPopulate(db_order, data, path).then((result)=>{

			return res.send({ success: true, data: result, msg: '创建成功' })

		}).catch(err => {

			return next(new Error(err))

		})

	},

	order_edit: async (req, res, next) => {

		let data = req.body

		let conditions = {
			_id: data._id
		}

		let options = {
			new: true
		}

		let path = 'aid'

		let return_data = await Model.findOneAndUpdateDataPopulate(db_order, conditions, data, options ,path).then((result)=>{

			return change_local_date(result.toObject())

		}).catch(err => {

			return next(new Error(err))

		})

		return res.send({ success: true, data: return_data, msg: '修改成功' })

	},

	order_status_change: async (req, res, next) => {

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

		Model.updateData(db_order, conditions, update , options).then((result)=>{

			return res.send({ success: true, msg: '修改成功' })

		}).catch(err => {

			return next(new Error(err))

		})

	},

	order_remove: async (req, res, next) => {

		let data = req.body

		let conditions = {
			_id: data.id
		}

		Model.removeData(db_order, conditions).then((result)=>{

			return res.send({ success: true, msg: '已删除' })

		}).catch(err => {

			return next(new Error(err))

		})

	}
}