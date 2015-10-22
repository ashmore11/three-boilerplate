import happens from 'happens';

class Window {

	constructor() {

		happens(this);

		this.window = $(window);
		this.width  = 0;
		this.height = 0;

		this.window.on('resize', this.resize);

		this.resize();

	}

	resize() {

		this.width  = this.window.width();
		this.height = this.window.height();

		this.emit('resize');

	}

}

export default new Window();
