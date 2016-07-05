import { EventEmitter } from 'events';

class Window extends EventEmitter {
  constructor() {
    super();

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    window.addEventListener('resize', this.resize.bind(this));

    this.resize();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.emit('resize');
  }
}

export default new Window;

