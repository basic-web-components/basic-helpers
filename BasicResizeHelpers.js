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
    if (this.resized) {
      this.resized();
    }    
  }

};
