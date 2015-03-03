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
   * Return the host element for this element. If this element is not hosted by
   * another element (it's not attached to anything, or is hosted by the
   * top-level document), this returns null.
   */
  get host() {
    for ( var parent = this.parentNode; parent != null; parent = parent.parentNode ) {
      if ( parent.host ) {
        return parent.host;
      }
    }
  },

  /**
   * If the element has a contentChanged handler, then wire up an observer 
   * that will invoke this handler whenever content changes.
   *
   * Additionally, if a component currently has content, the contentChanged
   * handler will be immediately invoked.
   *
   * If the optional observeChanges parameter is false, this function will
   * disconnect any existing observer.
   *
   * This method is typically invoked by a component's attached handler, and
   * the invoked with observeChanges = false in the detached handler.
   *
   * @method observeContentChanges
   */
  observeContentChanges: function(observeChanges) {
    var observe = (observeChanges == null) ? true : observeChanges;
    if (observe) {
      // Start observing
      if (this.contentChanged) {
        this._observeContentChanges(this, function() {
          this._contentChanged();
        }.bind(this));
        if (this.childNodes.length > 0) {
          // Consider any initial content of a new element to be "changed" content.
          this._contentChanged();
        }
      }
    } else if (this._contentChangeObserver) {
      // Stop observing
      this._contentChangeObserver.disconnect();
      this._contentChangeObserver = null;
    }
  },

  // Invoke the contentChanged handler -- but first, see if the nodes' new
  // content includes a content element, in which case we'd need to monitor the
  // component's host for changes, too.
  _contentChanged: function() {
    var containsContentNode = (this.querySelector('content') != null);
    if (containsContentNode) {
      // The element's new content contains <content> nodes, so from now on,
      // we need to observe our host element, too.
      // TODO: If this element's content changes again, disconnect any
      // outstanding observers of that old content.
      // TODO: If the host element *also* contains <content> nodes, we should
      // watch those too. *sigh*
      this._observeHostContentChanges();
    }
    this.contentChanged();
  },

  // Wire up an observer for (light DOM) content change events on the given
  // node.
  _observeContentChanges: function(node, handler) {
    node._contentChangeObserver = new MutationObserver(handler);
    node._contentChangeObserver.observe(node, {
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
