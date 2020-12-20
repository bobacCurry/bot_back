const Model = require('../common/model')

const db_global_order = require('../../model/schema/global_order.js')

const db_ads = require('../../model/schema/ads')

const jwt = require('../../middleware/check_token')

const { page_helper, change_local_date } = require('../common/helpers')

module.exports = {
	global_order_get_list: async (req, res, next) => {

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
		let path = 'ads'

		let order_list = await Model.findDataPopulation(db_global_order,_conditions,find_fields,find_options,path).then((result)=>{
			return result
		}).catch(err => {
			return next(new Error(err))
		})
		order_list = change_local_date(order_list)

		let order_count = await Model.countData(db_global_order,_conditions).then((result)=>{
			return result
		}).catch(err => {
			return next(new Error(err))
		})

		return res.send({ success: true, order_list: order_list, order_count: order_count })

	},

	global_order_create: async (req, res, next) => {

		let data = req.body,
			path = 'ads'

		Model.addDataPopulate(db_global_order, data, path).then((result)=>{

			return res.send({ success: true, data: result, msg: '创建成功' })

		}).catch(err => {

			return next(new Error(err))

		})

	},

	global_order_edit: async (req, res, next) => {

		let data = req.body

		let conditions = {
			_id: data._id
		}

		let options = {
			new: true
		}

		let path = 'ads'

		let return_data = await Model.findOneAndUpdateDataPopulate(db_global_order, conditions, data, options ,path).then((result)=>{

			return change_local_date(result.toObject())

		}).catch(err => {

			return next(new Error(err))

		})

		return res.send({ success: true, data: return_data, msg: '修改成功' })

	},

	global_order_remove: async (req, res, next) => {

		let data = req.body

		let conditions = {
			_id: data.id
		}

		Model.removeData(db_global_order, conditions).then((result)=>{

			return res.send({ success: true, msg: '已删除' })

		}).catch(err => {

			return next(new Error(err))

		})

	},

	global_order_pass: async (req, res, next) => {

		const { id } = req.body

		try{

			const order = await db_global_order.findById(id).populate('ads','_id end_at')

			if(!order){

				return res.send({ success: false, msg: '订单不存在' })
			}

			const { ads, day } = order

			if(!ads){

				return res.send({ success: false, msg: '全局广告不存在' })
			}

			let { _id, end_at } = ads

			const now = new Date().getTime()

			if(end_at>now){

				end_at = end_at + day*24*3600*1000

			}else{

				end_at = now + day*24*3600*1000
			}

			await db_ads.findByIdAndUpdate(_id,{ end_at, status: 1 })

		}catch(err){

			return next(new Error(err))
		}

		return res.send({ success: true, msg: '广告更新成功' })
	},

	global_order_refuse: async (req, res, next) => {

		const { id } = req.body

		try{

			await db_global_order.findByIdAndUpdate(id,{ status: 0 })

		}catch(err){

			return next(new Error(err))
		}

		return res.send({ success: true, msg: '更新成功' })
	}
}