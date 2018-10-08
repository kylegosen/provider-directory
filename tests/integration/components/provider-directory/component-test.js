import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | provider-directory', function(hooks) {
  setupRenderingTest(hooks);

  test("Properties", async function(assert) {
    await render(hbs`{{provider-directory}}`);

    assert.equal(this.$(".header").text().trim(), "Provider Directory");
    assert.equal(this.$(".provider-form").length, 1);
    assert.equal(this.$(".provider-list").length, 1);
  });
});
