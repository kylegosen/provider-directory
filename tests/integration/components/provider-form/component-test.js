import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | provider-form', function(hooks) {
  setupRenderingTest(hooks);

  test("Title - Create", async function(assert) {
    this.set("provider", {});
    await render(hbs`{{provider-form provider=provider}}`);

    assert.equal(this.$(".provider-form-title").text().trim(), 'Create Provider');
  });

  test("Title - Edit", async function(assert) {
    this.set("provider", {id: "1"});
    await render(hbs`{{provider-form provider=provider}}`);

    assert.equal(this.$(".provider-form-title").text().trim(), 'Edit Provider');
  });

  test("Fields", async function(assert) {
    this.set("provider", {id: "1", lastName: "Gosen", firstName: "Kyle", emailAddress: "kg@test.com",
      specialty: "Computers", practiceName: "Kyle's Computers"});
    await render(hbs`{{provider-form provider=provider}}`);

    assert.equal(this.$(".form-group label").eq(0).text().trim(), "Last Name");
    assert.equal(this.$(".form-group input").eq(0).val(), "Gosen");
    assert.equal(this.$(".form-group label").eq(1).text().trim(), "First Name");
    assert.equal(this.$(".form-group input").eq(1).val(), "Kyle");
    assert.equal(this.$(".form-group label").eq(2).text().trim(), "Email Address");
    assert.equal(this.$(".form-group input").eq(2).val(), "kg@test.com");
    assert.equal(this.$(".form-group label").eq(3).text().trim(), "Specialty");
    assert.equal(this.$(".form-group input").eq(3).val(), "Computers");
    assert.equal(this.$(".form-group label").eq(4).text().trim(), "Practice Name");
    assert.equal(this.$(".form-group input").eq(4).val(), "Kyle's Computers");

    assert.equal(this.$(".cancel-button").text().trim(), "Cancel");
    assert.equal(this.$(".submit-button").text().trim(), "Submit");
  });
});
