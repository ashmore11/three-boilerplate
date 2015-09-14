require 'coffee-script'

module.exports =
	
	output:
		filename: 'app.js'
	
	module:
		loaders: [
			{ test: /\.coffee$/, loader: 'coffee-loader' }
		]
	
	resolve:
		extensions: [ '', '.js', '.coffee' ]
		alias:
			views       : __dirname + '/src/coffee/views'
			utils       : __dirname + '/src/coffee/utils'
			helpers     : __dirname + '/src/coffee/helpers'
			settings    : __dirname + '/src/coffee/settings.coffee'

	node:
		fs: 'empty'
