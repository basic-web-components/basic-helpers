var BasicResizeHelpers = {

  listenForResize: function(listen) {
    if ( listen || listen == null ) {

      // Listen
      this._resizeHandler = this._onResize.bind(this);
      window.addEventListener('resize', this._resizeHandler);

      // Trigger resized handler so that element can do initial setup.
      this._onResize();

    } else {

      // Stop listening
      window.removeEventListener('resize', this._resizeHandler);
      this._resizeHandler = null;

    }
  },

  _onResize: function() {
    var previousSize = this._previousSize;
    var width = this.offsetWidth;
    var height = this.offsetHeight;
    var sizeChanged = ( previousSize == null || 
        width !== previousSize.width ||
        height !== previousSize.height );
    if (sizeChanged) {
      this._previousSize = {
        height: height,
        width: width
      };
      if (this.resized) {
        this.resized();
      }
    }
  }

};
