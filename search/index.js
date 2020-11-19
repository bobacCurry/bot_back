const axios = require('axios')

const config = require('../config')

const search_url = config.env.search_url

module.exports = {

	set_cn: async (index) => {

		try {

			const title = { type: 'text', analyzer: 'ik_smart', search_analyzer: 'ik_smart' }

			const description = { type: 'text', analyzer: 'ik_smart', search_analyzer: 'ik_smart' }

			const keywords = { type: 'keyword', index: true }

			const username = { type: 'keyword', index: true }

			let properties = { keywords, username }

			if (index === 'cn') {

				properties = {...properties, title, description}
			
			}

			const { data } = await axios.post(`${search_url}/${index}/resource/_mapping`,{ properties })

			return data

		}catch({response}) {

			if (!response){

				throw 'search engine not start'
			}

			throw response.data
		}
	},
	create_index: async (index,mappings={}) => {

		try {

			const { data } = await axios.put(`${search_url}/${index}?pretty&pretty`,mappings)

			return data

		}catch({ response }) {

			if (!response){

				throw 'search engine not start'
			}

			throw response.data
		}
	},
	delete_index: async (index) => {

		try {
			
			const { data } = await axios.delete(`${search_url}/${index}?pretty&pretty`)

			return data

		}catch({ response }) {

			if (!response){

				throw 'search engine not start'
			}

			throw response.data
		}
	},
	create_document: async (index, type, doc) => {

		try {
			
			const { data } = await axios.put(`${search_url}/${index}/${type}/${doc.id}?pretty&pretty`,doc)

			return data
			
		}catch({ response }) {

			if (!response){

				throw 'search engine not start'
			}

			throw response.data
		}
	},
	update_document: async (index, type, doc) => {

		try {

			const { data } = await axios.post(`${search_url}/${index}/${type}/${doc.id}/_update?pretty&pretty`,{ doc })

			return data
			
		}catch({ response }) {

			if (!response){

				throw 'search engine not start'
			}

			throw response.data
		}
	},
	delete_document: async (index, type, id) => {

		try {
			
			const { data } = await axios.delete(`${search_url}/${index}/${type}/${id}?pretty&pretty`)

			return data
			
		}catch({ response }) {

			if (!response){

				throw 'search engine not start'
			}

			throw response.data
		}
	},
	search_document: async (index, type, keyword, page = 1, size = 30) => {

		try {

			const { data } = await axios.get(`${search_url}/${index}/${type}/_search`,{
				
				data: {
					
					query: {

						bool: {

							should: [
								{	
									term: {

										keywords: {
										
											value: keyword,

											boost: 15
										}
									}
								},
								{	
									term: {

										username: {

											value: keyword,

											boost: 10
										}
									}
								},
						        {
						        	multi_match: {
						        
							            query: keyword,
							        
							            fields: [ "title^5", "description" ] 
							        }
							    }
						    ]
						}
				    },

				    sort: [
				    
				        { score : { order: "desc" } },
				    
				        { _score : { order: "desc" } }
				    ],

				    from : (page-1)*size,

				    size
				}
			})

			return data
			
		}catch({ response }) {

			if (!response){

				throw 'search engine not start'
			}

			throw response.data
		}
	}
}