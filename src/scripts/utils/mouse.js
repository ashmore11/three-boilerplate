import happens from 'happens';

class Mouse {

	constructor() {

		happens(this);

    this.doc = $(document);
    this.x   = 0;
    this.y   = 0;

		this.doc.on('mousemove', this.mousemove);

  }

	mousemove( event ) {

    this.x = event.pageX - ( $(window).width() / 2 );
    this.y = event.pageY - ( $(window).height() / 2 );

    this.emit('move');

  }

}

export default new Mouse();
