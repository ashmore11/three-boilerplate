import EventEmitter from 'events';

class Window extends EventEmitter {
	width = 0;
	height = 0;

	constructor() {
		super();

		window.addEventListener('resize', ::this.resize);
		this.resize();
	}

	resize() {
		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.emit('resize');
	}
}

export default new Window();
