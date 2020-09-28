const common = require('./common/index')

const account = require('./account/index')

const backend = require('./backend/index')

module.exports = function(app) {

	common(app)

	account(app)

	backend(app)
}