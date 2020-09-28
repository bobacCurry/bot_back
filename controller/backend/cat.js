const Model = require('../common/model')

const db_cat = require('../../model/schema/cat.js')

const jwt = require('../../middleware/check_token')

const { page_helper, change_local_date } = require('../common/helpers')

module.exports = {
	cat_get_list: async (req, res, next) => {

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
			if(['tags'].includes(conditions.type)) {
				_conditions[conditions.type] = {$elemMatch:{$regex:regexp}}
			}else if(['text','lang'].includes(conditions.type)){
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
		let cat_list = await Model.findData(db_cat,_conditions,find_fields,find_options).then((result)=>{
			return result
		}).catch(err => {
			return next(new Error(err))
		})
		cat_list = change_local_date(cat_list)

		let cat_count = await Model.countData(db_cat,_conditions).then((result)=>{
			return result
		}).catch(err => {
			return next(new Error(err))
		})

		return res.send({ success: true, cat_list: cat_list, cat_count: cat_count })

	},

	cat_create: async (req, res, next) => {

		let data = req.body

		Model.addData(db_cat,data).then((result)=>{

			return res.send({ success: true, data: result, msg: '创建成功' })

		}).catch(err => {

			return next(new Error(err))

		})

	},

	cat_edit: async (req, res, next) => {

		let data = req.body

		let conditions = {
			_id: data._id
		}

		let options = {
			new: true
		}
		let return_data = await Model.findOneAndUpdateData(db_cat, conditions, data, options).then((result)=>{

			return change_local_date(result.toObject())

		}).catch(err => {

			return next(new Error(err))

		})

		return res.send({ success: true, data: return_data, msg: '修改成功' })

	},

	cat_status_change: async (req, res, next) => {

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

		Model.updateData(db_cat, conditions, update , options).then((result)=>{

			return res.send({ success: true, msg: '修改成功' })

		}).catch(err => {

			return next(new Error(err))

		})

	},

	cat_remove: async (req, res, next) => {

		let data = req.body

		let conditions = {
			_id: data.id
		}

		Model.removeData(db_cat, conditions).then((result)=>{

			return res.send({ success: true, msg: '已删除' })

		}).catch(err => {

			return next(new Error(err))

		})

	}
}