import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | provider', function(hooks) {
  setupTest(hooks);

  test("Creates Provider", function(assert) {
    let service = this.owner.lookup('service:provider');

    let result = service.createProvider("1", "Gosen", "Kyle", "kg@test.com", "Computers", "Kyle's Computers");

    assert.equal(result.get("id"), "1");
    assert.equal(result.get("lastName"), "Gosen");
    assert.equal(result.get("firstName"), "Kyle");
    assert.equal(result.get("emailAddress"), "kg@test.com");
    assert.equal(result.get("specialty"), "Computers");
    assert.equal(result.get("practiceName"), "Kyle's Computers");
  });
});
