const common = require('./common/index')

const account = require('./account/index')

module.exports = function(app) {

	common(app)

	account(app)
}