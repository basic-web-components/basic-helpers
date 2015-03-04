suite('BasicResizeHelpers', function() {

  this.timeout(2000);

  var container = document.getElementById('container');

  // Simulate a resize event.
  var simulateResize = function() {
    var event = new UIEvent('resize');
    // event.bubbles = false;
    // event.cancelBubble = false;
    // event.cancelable = false;
    // event.currentTarget = Window;
    // event.defaultPrevented = false;
    // event.path = Array[1];
    // event.returnValue = true;
    // event.srcElement = Window;
    // event.target = Window;
    // event.timeStamp = 1425508271138;
    // event.type = "resize";
    window.dispatchEvent(event);
  };

  teardown(function() {
    container.innerHTML = '';
  });

  test('listenForResize should trigger initial call to resized handler', function() {
    var fixture = document.createElement('resize-test-element');
    container.appendChild(fixture);
    assert.equal(fixture.resizeCallCount, 1);
  });

  test('window resize event should trigger resized handler', function(done) {
    var fixture = document.createElement('resize-test-element');
    container.appendChild(fixture);
    assert.equal(fixture.resizeCallCount, 1);
    fixture.resizeCallHook = function() {
      assert.equal(fixture.resizeCallCount, 2);
      done();
    }
    simulateResize();
  });

});
