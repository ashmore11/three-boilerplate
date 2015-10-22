import Happens from 'happens';

(function() {

	let lastTime = 0;
	let vendors = ["ms", "moz", "o"];
	let x = 0;

	while(x < vendors.length && !window.requestAnimationFrame){

		window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
		window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
		
		++x;

	}

	if (!window.requestAnimationFrame) {
		
		window.requestAnimationFrame = (callback, element) => {
			
			let currTime = new Date().getTime();
			let timeToCall = Math.max(0, 16 - (currTime - lastTime));
			
			let id = window.setTimeout( () => {
				
				callback(currTime + timeToCall);

			}, timeToCall);

			lastTime = currTime + timeToCall;
			
			return id;

		}

	}

	if (!window.cancelAnimationFrame) {

		window.cancelAnimationFrame = (id) => clearTimeout(id);

	}

}());

class RAF {

	constructor() {

		Happens(this);

		this.id_animloop = null;

		this.start();

	}

	start() {

		this.id_animloop = window.requestAnimationFrame(this.animloop.bind(this));

	}

	stop() {

		window.cancelAnimationFrame(this.id_animloop.bind(this));
		
		this.id_animloop = null;

	}

	animloop(time) {
 
		this.id_animloop = window.requestAnimationFrame(this.animloop.bind(this));

		this.emit('tick', time);

	}

}

export default new RAF();