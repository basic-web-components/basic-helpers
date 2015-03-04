suite('BasicResizeHelpers', function() {

  this.timeout(2000);

  var container = document.getElementById('container');

  teardown(function() {
    container.innerHTML = '';
  });

  test('listenForResize should trigger initial call to resized handler', function() {
    var fixture = document.createElement('resize-test-element');
    var spy = sinon.spy(fixture, 'resized');
    container.appendChild(fixture);
    assert(spy.called);
    fixture.resized.restore();
  });

});
