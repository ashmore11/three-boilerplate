import EventEmitter from 'events';

class RAF extends EventEmitter {
	raf = null;

	constructor() {
		super();

		this.start();
	}

	start() {
		this.raf = window.requestAnimationFrame(::this.animate);
	}

	stop() {
		window.cancelAnimationFrame(::this.raf);

		this.raf = null;
	}

	animate(delta) {
		this.raf = window.requestAnimationFrame(::this.animate);

		this.emit('tick', delta);
	}
}

export default new RAF();