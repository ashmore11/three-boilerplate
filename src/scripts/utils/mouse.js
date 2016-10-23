import EventEmitter from 'events';

class Mouse extends EventEmitter {
  x = 0;
  y = 0;

	constructor() {
    super();

		document.addEventListener('mousemove', ::this.mousemove);
  }

	mousemove(event) {
    this.x = event.pageX - (window.innerWidth / 2);
    this.y = event.pageY - (window.innerHeight / 2);

    this.emit('move');
  }
}

export default new Mouse();
