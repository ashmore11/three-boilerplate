import Happens from 'happens';

class RAF {

	constructor() {

		Happens(this);

		this.raf = null;

		this.start();

	}

	start() {

		this.raf = window.requestAnimationFrame(this.animate.bind(this));

	}

	stop() {

		window.cancelAnimationFrame(this.raf.bind(this));
		
		this.raf = null;

	}

	animate(time) {
 
		this.raf = window.requestAnimationFrame(this.animate.bind(this));

		this.emit('tick', time);

	}

}

export default new RAF();