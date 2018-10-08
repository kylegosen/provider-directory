import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { A } from '@ember/array';
import EmberObject from '@ember/object';
import { fillIn, click } from '@ember/test-helpers';
import sinon from 'sinon';
import { selectChoose } from 'ember-power-select/test-support/helpers';

module('Integration | Component | provider-list', function(hooks) {
  setupRenderingTest(hooks);

  let providers;
  hooks.before(function(){
    providers = A([
      EmberObject.create({id: "1", lastName: "Gosen", firstName: "Kyle",
        emailAddress: "kg@test.com", specialty: "Computers", practiceName: "Kyle's Computers"}),
      EmberObject.create({id: "2", lastName: "Smith", firstName: "John",
        emailAddress: "js@test.com", specialty: "Special Stuff", practiceName: "Practice A"})
    ]);
  });

  test("Title", async function(assert) {
    await render(hbs`{{provider-list}}`);

    assert.equal(this.$(".provider-list-header").text().trim(), "Provider List");
    let resultsMessage = this.$(".results-message").text().trim();
    assert.equal(resultsMessage.includes("No Providers Exist, Use"), true);
    assert.equal(resultsMessage.includes("Create Provider"), true);
    assert.equal(resultsMessage.includes("to Create One!"), true);
  });

  test("Results", async function(assert) {
    this.set("providers", providers);
    await render(hbs`{{provider-list providers=providers}}`);

    assert.equal(this.$(".provider-row").length, 2);
  });

  test("Search", async function(assert) {
    this.set("providers", providers);
    await render(hbs`{{provider-list providers=providers}}`);

    await fillIn(".filter-by", "kyle");
    assert.equal(this.$(".provider-row").length, 1);
    assert.equal(this.$(".provider-full-name").text().trim(), "Gosen, Kyle");

    await fillIn(".filter-by", "SMITH");
    assert.equal(this.$(".provider-row").length, 1);
    assert.equal(this.$(".provider-full-name").text().trim(), "Smith, John");

    await fillIn(".filter-by", "kg@test");
    assert.equal(this.$(".provider-row").length, 1);
    assert.equal(this.$(".provider-full-name").text().trim(), "Gosen, Kyle");

    await fillIn(".filter-by", "pecial");
    assert.equal(this.$(".provider-row").length, 1);
    assert.equal(this.$(".provider-full-name").text().trim(), "Smith, John");

    await fillIn(".filter-by", "Kyle's");
    assert.equal(this.$(".provider-row").length, 1);
    assert.equal(this.$(".provider-full-name").text().trim(), "Gosen, Kyle");

    await fillIn(".filter-by", "abcdefg");
    assert.equal(this.$(".provider-row").length, 0);
    assert.equal(this.$(".results-message").text().trim(), "No Providers Match Your Search.");
  });

  test("Sort", async function(assert) {
    let kyle = "Gosen, Kyle";
    let john = "Smith, John";

    this.set("providers", providers);
    await render(hbs`{{provider-list providers=providers editProvider=editStub}}`);

    await selectSorting("Last Name", "Asc");
    assert.equal(this.$(".provider-full-name").eq(0).text().trim(), kyle);
    await selectSorting("Last Name", "Desc");
    assert.equal(this.$(".provider-full-name").eq(0).text().trim(), john);

    await selectSorting("First Name", "Asc");
    assert.equal(this.$(".provider-full-name").eq(0).text().trim(), john);
    await selectSorting("First Name", "Desc");
    assert.equal(this.$(".provider-full-name").eq(0).text().trim(), kyle);

    await selectSorting("Email Address", "Asc");
    assert.equal(this.$(".provider-full-name").eq(0).text().trim(), john);
    await selectSorting("Email Address", "Desc");
    assert.equal(this.$(".provider-full-name").eq(0).text().trim(), kyle);

    await selectSorting("Specialty", "Asc");
    assert.equal(this.$(".provider-full-name").eq(0).text().trim(), kyle);
    await selectSorting("Specialty", "Desc");
    assert.equal(this.$(".provider-full-name").eq(0).text().trim(), john);

    await selectSorting("Practice Name", "Asc");
    assert.equal(this.$(".provider-full-name").eq(0).text().trim(), kyle);
    await selectSorting("Practice Name", "Desc");
    assert.equal(this.$(".provider-full-name").eq(0).text().trim(), john);
  });

  test("Edit", async function(assert) {
    let editStub = sinon.stub();
    this.set("editStub", editStub);

    this.set("providers", providers);
    await render(hbs`{{provider-list providers=providers editProvider=editStub}}`);

    await click(".edit-button button");

    sinon.assert.calledOnce(editStub);
    let args = editStub.getCalls()[0].args[0];
    assert.equal(args.id, "1");
  });

  test("Remove", async function(assert) {
    let removeStub = sinon.stub();
    this.set("removeStub", removeStub);

    this.set("providers", providers);
    await render(hbs`{{provider-list providers=providers removeProviders=removeStub}}`);

    assert.equal(this.$(".remove-button").attr("disabled"), "disabled");

    await click("input[type=checkbox]");
    assert.equal(this.$(".remove-button").attr("disabled"), undefined);

    await click(".remove-button");
    sinon.assert.calledOnce(removeStub);
    let args = removeStub.getCalls()[0].args[0];
    assert.equal(args[0].id, "1");
  });
});

async function selectSorting(field, direction){
  await selectChoose('.sort-field', field);
  await selectChoose('.sort-direction', direction);
}
