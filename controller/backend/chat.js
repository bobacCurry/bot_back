const Model = require('../common/model')

const db_chat = require('../../model/schema/chat.js')

const { update_document, delete_document, search_document } = require('../../search/index')

const { get_mention, check_mention, record_mention } = require('../updates/search/mention')

const { LANGLIST } = require('../../config')

const { page_helper, change_local_date, key_array } = require('../common/helpers')

module.exports = {
	chat_get_list: async (req, res, next) => {

		const { lang, keyword, page, size } = req.body

		if (!lang){

			return res.send({ success:false, msg: '请选择搜索语言'})
		}

		if (!keyword){

			return res.send({ success:false, msg: '请选择搜索关键词'})
		}

		if (!page){

			return res.send({ success:false, msg: '请选择搜索页码'})
		}

		if (!size){

			return res.send({ success:false, msg: '请选择搜索条数'})
		}

		try {

			const { hits } = await search_document(lang, 'chat', keyword, page, size)

			let chat_list = key_array('_source',hits.hits),
				chat_count = hits.total.value

			return res.send({ success: true, chat_list: chat_list, chat_count: chat_count })

		}catch(err){

			return res.send({ success:false, msg: err.error.reason })
		}
	},

	chat_create: async (req, res, next) => {

		let { username, token } = req.body

		if (!username||!token){

			return res.send({ success:false, msg: '参数缺失'})
		}

		const record = await get_mention(username)

		let msg = ''

		if (record){

			msg = `链接：<a href="https://t.me/${record.username}">${record.username}</a>\n类型：${record.type==='supergroup'?'群组':'频道'}\n所属语种：${record.lang}\n标题：${record.title}\n简介：${record.description}\n成员数：${record.member_count}`

		}else{

			try {

				const get_chat = await check_mention(token,username)

				await record_mention(token,get_chat.result)

				msg = '添加索引成功'

			}catch(err){

				// msg = '添加索引失败'

				return res.send({ success:false, msg: err.error.reason }).status(500)

			}
		}

		return res.send({ success: true, msg: msg })
	},

	chat_remove: async (req, res, next) => {

		const { lang, id } =  req.body

		if (!lang||!id){

			return res.send({ success:false, msg: '参数缺失' })
		}

		try{

			await db_chat.findByIdAndDelete(id)

			await delete_document(lang, 'chat', id)

			return res.send({ success:true, msg: '删除成功' })

		}catch(err){

			return res.send({ success:false, msg: err.error.reason })
		}
	},

	chat_edit: async (req, res, next) => {

		const { id, title, description, username, type, member_count, lang, score, keywords, end_at } =  req.body

		if (!id||!title||!username||!type||!lang){

			return res.send({ success:false, msg: '参数缺失' })
		}

		if(LANGLIST.indexOf(lang)===-1){

			return res.send({ success:false, msg: '不存在该类型语言' })
		}

		try{

			const chat = await db_chat.findByIdAndUpdate(id,{ title, description, username, type, member_count, lang, score, keywords, end_at })

			if(!chat){

				return res.send({ success:false, msg: '更新失败，未找到相关群信息' })
			}

			const doc = { id, title, description, username, type, member_count, score, keywords }

			await update_document(lang,'chat',doc)

			return res.send({ success: true, data: doc, msg: '修改成功' })

		}catch(err){

			return res.send({ success:false, msg: err.error.reason })
		}

	}
}