import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | providers', function(hooks) {
  setupTest(hooks);

  test("Defaults to Initial Providers", function(assert) {
    let route = this.owner.lookup('route:providers');

    let model = route.model();

    assert.equal(model.get("length"), 6);
  });
});
