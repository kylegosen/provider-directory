import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | provider-form', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let component = this.owner.factoryFor('component:provider-form').create();
    assert.ok(component);
  });
});
