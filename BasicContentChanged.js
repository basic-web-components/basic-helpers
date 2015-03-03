var BasicContentChanged = {

  poke: function() {
    var event = new CustomEvent('custom-event');
    this.dispatchEvent(event);
  }

};
