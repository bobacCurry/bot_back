module.exports = function(app) {

	app.use('/backend', require('./bot'))

	app.use('/backend', require('./chat'))

	app.use('/backend', require('./cat'))

	app.use('/backend', require('./ads'))

	app.use('/backend', require('./order'))

	app.use('/backend', require('./global_order'))

	app.use('/backend', require('./menu'))

	app.use('/backend', require('./filter'))

}