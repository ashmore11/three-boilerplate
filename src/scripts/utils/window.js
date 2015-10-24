import Happens from 'happens';

class Window {

	constructor() {

		Happens(this);

		this.window = $(window);
		this.width  = 0;
		this.height = 0;

		this.window.on('resize', this.resize.bind(this));

		this.resize();

	}

	resize() {

		this.width  = this.window.width();
		this.height = this.window.height();

		this.emit('resize');

	}

}

export default new Window();