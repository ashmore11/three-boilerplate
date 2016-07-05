import { EventEmitter } from 'events';

class Mouse extends EventEmitter {
  constructor() {
    super();

    this.x = 0;
    this.y = 0;
    this.isMoving = false;

    document.addEventListener('mousemove', this.mousemove.bind(this));
  }

  mousemove(event) {
    this.x = event.pageX - (window.innerWidth / 2);
    this.y = event.pageY - (window.innerHeight / 2);

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.isMoving = false;
      this.emit('stop');
    }, 500);
    this.isMoving = true;

    this.emit('move');
  }
}

export default new Mouse;
