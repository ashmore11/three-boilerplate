happens = require 'happens'

class RAF

	id_animloop : null

	constructor: ( ) ->

		happens @

		@start()

	start: ( ) ->

		@id_animloop = window.requestAnimationFrame @animloop

	stop: ( ) ->

		window.cancelAnimationFrame @id_animloop
		
		@id_animloop = null

	animloop: ( time ) =>
 
		@id_animloop = window.requestAnimationFrame @animloop

		@emit 'tick', time

module.exports = new RAF