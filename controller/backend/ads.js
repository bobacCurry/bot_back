const Model = require('../common/model')

const db_ads = require('../../model/schema/ads.js')

const jwt = require('../../middleware/check_token')

const { page_helper, change_local_date } = require('../common/helpers')

module.exports = {
	ads_get_list: async (req, res, next) => {

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
			if(['text','link'].includes(conditions.type)){
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
		let ads_list = await Model.findData(db_ads,_conditions,find_fields,find_options).then((result)=>{
			return result
		}).catch(err => {
			return next(new Error(err))
		})
		ads_list = change_local_date(ads_list)

		let ads_count = await Model.countData(db_ads,_conditions).then((result)=>{
			return result
		}).catch(err => {
			return next(new Error(err))
		})

		return res.send({ success: true, ads_list: ads_list, ads_count: ads_count })

	},

	ads_create: async (req, res, next) => {

		let data = req.body

		Model.addData(db_ads,data).then((result)=>{

			return res.send({ success: true, data: result, msg: '创建成功' })

		}).catch(err => {

			return next(new Error(err))

		})

	},

	ads_edit: async (req, res, next) => {

		let data = req.body

		let conditions = {
			_id: data._id
		}

		let options = {
			new: true
		}
		let return_data = await Model.findOneAndUpdateData(db_ads, conditions, data, options).then((result)=>{

			return change_local_date(result.toObject())

		}).catch(err => {

			return next(new Error(err))

		})

		return res.send({ success: true, data: return_data, msg: '修改成功' })

	},

	ads_remove: async (req, res, next) => {

		let data = req.body

		let conditions = {
			_id: data.id
		}

		Model.removeData(db_ads, conditions).then((result)=>{

			return res.send({ success: true, msg: '已删除' })

		}).catch(err => {

			return next(new Error(err))

		})

	}

}