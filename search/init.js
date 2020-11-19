const { create_index, set_cn } = require('./index')

const INDEX = [ 'cn', 'en' ]

const init =  async () => {

	const title_cn = { type: 'text', analyzer: 'ik_smart', search_analyzer: 'ik_smart' }

	const description_cn = { type: 'text', analyzer: 'ik_smart', search_analyzer: 'ik_smart' }

	const keywords = {
				        	
    	type: 'keyword',

    	index: true,
    	
    	normalizer: 'keyword_normalizer'
  	}

	INDEX.map(async (item) => {

		let properties = { keywords }

		if (item === 'cn') {

			properties = {...properties, title: title_cn, description: description_cn}
		
		}

		const mappings = {

			settings: {
			
			    analysis: {
			
			      	normalizer: {
			
			        	keyword_normalizer: {
			          		
			          		type: 'custom',
			          		
			          		filter: ['lowercase']
			        	}
			      	}
			    }
			},
		  	mappings: {

		  		chat: {

		  			properties
		  		}
		  	}
		}

		try {

			const ret = await create_index(item,mappings)

			console.log(ret)

		}catch(err) {

			console.log(err)
		}

		return
	})
}

module.exports = init