/*
 * Mixin to help a component monitor changes in its own content.
 *
 * In many cases, a component performs processing of its own children: it
 * performs layout operations on them, it modifies them. There is currently
 * (March 2015) no concise, standard means of doing this. This feature is
 * complicated by the Shadow DOM's support for reprojected content.
 */

var BasicContentChanged = {

  /**
   * If the element has a contentChanged handler, then wire up an observer 
   * that will invoke this handler whenever content changes.
   *
   * Additionally, if a component currently has content, the contentChanged
   * handler will be immediately invoked.
   *
   * This method is typically invoked by a component's attached handler.
   *
   * @method observeContentChanges
   */
  observeContentChanges: function() {
    if (this.contentChanged) {
      this._observeContentChanges(this, function() {
        this._contentChanged();
      }.bind(this));
      if (this.childNodes.length > 0) {
        // Consider any initial content of a new element to be "changed" content.
        this._contentChanged();
      }
    }
  },

  // Invoke the contentChanged handler -- but first, see if the nodes' new
  // content includes a content element, in which case we'd need to monitor the
  // component's host for changes, too.
  _contentChanged: function() {
    // var containsContentNode = (this.querySelector("content") != null);
    // if (containsContentNode) {
    //   // The element's new content contains <content> nodes, so from now on,
    //   // we need to observe our host element, too.
    //   // TODO: If this element's content changes again, disconnect any
    //   // outstanding observers of that old content.
    //   // TODO: If the host element *also* contains <content> nodes, we should
    //   // watch those too. *sigh*
    //   this._observeHostContentChanges();
    // }
    this.contentChanged();
  },

  // Wire up an observer for (light DOM) content change events on the given
  // node.
  _observeContentChanges: function(node, handler) {
    var observer = new MutationObserver(handler);
    observer.observe(node, {
      // attributes: true,
      characterData: true,
      childList: true,
      subtree: true
    });
  },

  _observeHostContentChanges: function() {
    var host = this.host;
    if (host) {
      this._observeContentChanges(host, function() {
        this.contentChanged();
      }.bind(this));
    }
  }

};
