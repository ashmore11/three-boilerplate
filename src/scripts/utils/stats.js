import Stats from 'stats-js';

class STATS {
  constructor() {
    this.stats = new Stats();
     
    this.setMode(2);
    this.setStyle();
    this.appendDomElement();
  }

  appendDomElement() {
    document.body.appendChild(this.stats.domElement);
  }

  setStyle() {
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '5px';
    this.stats.domElement.style.top = '5px';
    this.stats.domElement.style.zIndex = '9999';
  }

  setMode(mode) {
    this.stats.setMode(mode);
  }

  begin() {
    this.stats.begin();
  }

  end() {
    this.stats.end();
  }
}

export default new STATS();