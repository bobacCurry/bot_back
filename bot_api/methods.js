const host = 'https://api.telegram.org/bot'

const axios = require('axios')

const HttpsProxyAgent = require("https-proxy-agent")

const httpsAgent = new HttpsProxyAgent("http://127.0.0.1:1080")

module.exports = {

	getMe: (token,params = {}) => {

		const api = host + token + '/getMe'

		return axios.get(api,{httpsAgent,params})
	},
	setWebhook: (token,params = {}) => {

		const api = host + token + '/setWebhook'

		return axios.get(api,{httpsAgent,params})
	},
	deleteWebhook: (token,params = {}) => {

		const api = host + token + '/deleteWebhook'

		return axios.get(api,{httpsAgent,params})
	},
	getWebhookInfo: (token,params = {}) => {

		const api = host + token + '/getWebhookInfo'

		return axios.get(api,{httpsAgent,params})
	},
	sendMessage: (token,params = {}) => {

		const api = host + token + '/sendMessage'

		return axios.get(api,{httpsAgent,params})
	},
	answerCallbackQuery(token,params = {}){

		const api = host + token + '/answerCallbackQuery'

		return axios.get(api,{httpsAgent,params})

	},
	editMessageText(token,params = {}){

		const api = host + token + '/editMessageText'

		return axios.get(api,{httpsAgent,params})

	},
	deleteMessage(token,params = {}){

		const api = host + token + '/deleteMessage'

		return axios.get(api,{httpsAgent,params})

	},
	restrictChatMember: (token,params = {}) => {

		const api = host + token + '/restrictChatMember'

		return axios.get(api,{httpsAgent,params})
	},
	sendChatAction: (token,params = {}) => {

		const api = host + token + '/sendChatAction'

		return axios.get(api,{httpsAgent,params})
	},
	sendPhoto: (token,params = {}) => {

		const api = host + token + '/sendPhoto'

		return axios.get(api,{httpsAgent,params})
	},
	getChat: (token,params = {}) => {

		const api = host + token + '/getChat'

		return axios.get(api,{httpsAgent,params})
	},
	getChatMembersCount: (token,params = {}) => {

		const api = host + token + '/getChatMembersCount'

		return axios.get(api,{httpsAgent,params})
	}
}