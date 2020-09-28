const helper = {

	page_helper : (page, size) => {

		page = parseInt(page)

		size = parseInt(size)

		let limit = size;

		let skip = limit*(page-1);

		return { 'skip': skip, 'limit': limit };
},

	local_date : (v) => {

		const d = new Date(v || Date.now());

		d.setMinutes(d.getMinutes() - d.getTimezoneOffset());

		return d.toISOString()

	},

	change_local_date : (data) => {

		if(data.constructor === Array) {

			data.forEach((item, index)=>{

				data[index].created_at = helper.local_date(item.created_at)

				data[index].updated_at = helper.local_date(item.updated_at)

			})

			return data


		}else if(data.constructor === Object){

			data.created_at = helper.local_date(data.created_at)

			data.updated_at = helper.local_date(data.updated_at)

			return data

		}else {

			return data

		}

	}
}

module.exports = helper;