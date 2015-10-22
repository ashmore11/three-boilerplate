require 'coffee-script'

module.exports =
	
	output:
		filename: 'app.js'

	module:
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
		]
	
	resolve:
		extensions: [ '', '.js' ]
		alias:
			views       : __dirname + '/src/scripts/views'
			utils       : __dirname + '/src/scripts/utils'
			helpers     : __dirname + '/src/scripts/helpers'
			settings    : __dirname + '/src/scripts/settings.js'

	node:
		fs: 'empty'
