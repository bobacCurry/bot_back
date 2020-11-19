const db_chat = require('../../../model/schema/chat')

const { create_document } = require('../../../search/index')

const { getChat, getChatMembersCount } = require('../../../bot_api/methods.js')

const get_mention = async (mention) => {

	const username = mention.replace('@','')

	const chat = await db_chat.findOne({ username })

	return chat
}

const check_mention = async (token, mention) => {

	let chat_id = '@'+mention.replace('@','')

	try {

		const { data } = await getChat(token,{ chat_id })

		return data

	}catch({ response }){

		console.log(response.data)

		throw response.data
	}
}

const record_mention = async (token, chat) => {

	const { username, title, description, type } = chat

	try{

		const lang = 'cn'

		let member_count = 0

		let chat_id ='@' + username

		const { data } = await getChatMembersCount(token,{ chat_id })

		if(data.ok){

			member_count = data.result
		}

		const record = await db_chat.create({ username, title, description, type, member_count })

		await create_document(lang, 'chat', { id:record._id, username:record.username, title:record.title, description:record.description, type:record.type, member_count:record.member_count, score:record.score, keywords:record.keywords })

		return record

	}catch(err){

		console.log(err)

		throw err
	}
}

module.exports = { get_mention, check_mention, record_mention }