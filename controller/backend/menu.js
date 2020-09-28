const Model = require('../common/model')

const db_menu = require('../../model/schema/menu.js')

const jwt = require('../../middleware/check_token')

const lgng_list = ['cn', 'en', 'jp']

const { page_helper, change_local_date } = require('../common/helpers')

module.exports = {
	menu_get_list: async (req, res, next) => {

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
			if(['text'].includes(conditions.type)) {
				_conditions['$or'] = []
				lgng_list.forEach(lang=>{
					let obj = {}
					let key = `${conditions.type}.${lang}`
					obj[key] = {$regex:regexp}
					_conditions['$or'].push(obj)
				})
			}else if(['path'].includes(conditions.type)){
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
		let menu_list = await Model.findData(db_menu,_conditions,find_fields,find_options).then((result)=>{
			return result
		}).catch(err => {
			return next(new Error(err))
		})
		menu_list = change_local_date(menu_list)

		let menu_count = await Model.countData(db_menu,_conditions).then((result)=>{
			return result
		}).catch(err => {
			return next(new Error(err))
		})

		return res.send({ success: true, menu_list: menu_list, menu_count: menu_count })

	},

	menu_create: async (req, res, next) => {

		let data = req.body

		Model.addData(db_menu,data).then((result)=>{

			return res.send({ success: true, data: result, msg: '创建成功' })

		}).catch(err => {

			return next(new Error(err))

		})

	},

	menu_edit: async (req, res, next) => {

		let data = req.body

		let conditions = {
			_id: data._id
		}

		let options = {
			new: true
		}
		let return_data = await Model.findOneAndUpdateData(db_menu, conditions, data, options).then((result)=>{

			return change_local_date(result.toObject())

		}).catch(err => {

			return next(new Error(err))

		})

		return res.send({ success: true, data: return_data, msg: '修改成功' })

	},

	menu_status_change: async (req, res, next) => {

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

		Model.updateData(db_menu, conditions, update , options).then((result)=>{

			return res.send({ success: true, msg: '修改成功' })

		}).catch(err => {

			return next(new Error(err))

		})

	},

	menu_remove: async (req, res, next) => {

		let data = req.body

		let conditions = {
			_id: data.id
		}

		Model.removeData(db_menu, conditions).then((result)=>{

			return res.send({ success: true, msg: '已删除' })

		}).catch(err => {

			return next(new Error(err))

		})

	}
}