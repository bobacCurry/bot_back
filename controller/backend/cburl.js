const Model = require('../common/model')

const db_cburl = require('../../model/schema/cburl.js')

const jwt = require('../../middleware/check_token')

const { page_helper, change_local_date } = require('../common/helpers')

module.exports = {
	cburl_get_list: async (req, res, next) => {

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
			if(['name','memo'].includes(conditions.type)){
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
		let cburl_list = await Model.findData(db_cburl,_conditions,find_fields,find_options).then((result)=>{
			return result
		}).catch(err => {
			return next(new Error(err))
		})
		cburl_list = change_local_date(cburl_list)

		let cburl_count = await Model.countData(db_cburl,_conditions).then((result)=>{
			return result
		}).catch(err => {
			return next(new Error(err))
		})

		return res.send({ success: true, cburl_list: cburl_list, cburl_count: cburl_count })

	},

	cburl_create: async (req, res, next) => {

		let data = req.body

		Model.addData(db_cburl,data).then((result)=>{

			return res.send({ success: true, data: result, msg: '创建成功' })

		}).catch(err => {

			return next(new Error(err))

		})

	},

	cburl_edit: async (req, res, next) => {

		let data = req.body

		let conditions = {
			_id: data._id
		}

		let options = {
			new: true
		}
		let return_data = await Model.findOneAndUpdateData(db_cburl, conditions, data, options).then((result)=>{

			return change_local_date(result.toObject())

		}).catch(err => {

			return next(new Error(err))

		})

		return res.send({ success: true, data: return_data, msg: '修改成功' })

	},

	cburl_status_change: async (req, res, next) => {

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

		Model.updateData(db_cburl, conditions, update , options).then((result)=>{

			return res.send({ success: true, msg: '修改成功' })

		}).catch(err => {

			return next(new Error(err))

		})

	},

	cburl_remove: async (req, res, next) => {

		let data = req.body

		let conditions = {
			_id: data.id
		}

		Model.removeData(db_cburl, conditions).then((result)=>{

			return res.send({ success: true, msg: '已删除' })

		}).catch(err => {

			return next(new Error(err))

		})

	}
}