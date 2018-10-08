import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { A } from '@ember/array';
import EmberObject from '@ember/object';

module('Unit | Component | provider-directory', function(hooks) {
  setupTest(hooks);

  test("provider", function(assert) {
    let component = this.owner.factoryFor('component:provider-directory').create();

    let result = component.get("provider");
    assert.notEqual(result, null);

    let provider = {id: "something"};
    component.set("provider", provider);

    assert.deepEqual(component.get("provider"), provider);
  });

  test("getNewProvider", function(assert) {
    let component = this.owner.factoryFor('component:provider-directory').create();

    let result = component.get("getNewProvider");
    assert.notEqual(result, null);
  });

  test("onSubmit - New", function(assert) {
    let component = this.owner.factoryFor('component:provider-directory').create();

    let provider = {lastName: "Gosen", firstName: "Kyle", emailAddress: "kg@test.com"};
    component.set("provider", provider);
    component._onSubmit(provider);

    let result = component.get("providers");

    assert.equal(result.get("length"), 1);
    assert.notEqual(component.get("provider.lastName"), "Gosen");
  });

  test("onSubmit - Edit", function(assert) {
    let component = this.owner.factoryFor('component:provider-directory').create(
      {
        providers: A([
          EmberObject.create({id: "1", lastName: "Gosen", firstName: "Kyle", emailAddress: "kg@test.com"}),
          EmberObject.create({id: "2", lastName: "Smith", firstName: "John", emailAddress: "js@test.com"})
        ])
      }
    );

    assert.equal(component.get("providers.length"), 2);

    let provider = {id: "1", lastName: "Different", firstName: "Something",
      emailAddress: "diff@test.com", specialty: "Something", practiceName: "Different"};
    component.set("provider", provider);
    component._onSubmit(provider);

    let result = component.get("providers");

    assert.equal(result.get("length"), 2);

    let updatedProvider = component.get("providers").find(({id}) => id === "1");
    assert.equal(updatedProvider.get("id"), "1");
    assert.equal(updatedProvider.get("lastName"), "Different");
    assert.equal(updatedProvider.get("firstName"), "Something");
    assert.equal(updatedProvider.get("emailAddress"), "diff@test.com");
    assert.equal(updatedProvider.get("specialty"), "Something");
    assert.equal(updatedProvider.get("practiceName"), "Different");

    assert.notEqual(component.get("provider.lastName"), "Gosen");
  });

  test("onEdit", function(assert) {
    let component = this.owner.factoryFor('component:provider-directory').create();

    component._onEdit(EmberObject.create(
      {id: "1", lastName: "Gosen", firstName: "Kyle", emailAddress: "kg@test.com",
        specialty: "Computers", practiceName: "Kyle's Computers"}
      ));

    let provider = component.get("provider");

    assert.equal(provider.get("id"), "1");
    assert.equal(provider.get("lastName"), "Gosen");
    assert.equal(provider.get("firstName"), "Kyle");
    assert.equal(provider.get("emailAddress"), "kg@test.com");
    assert.equal(provider.get("specialty"), "Computers");
    assert.equal(provider.get("practiceName"), "Kyle's Computers");
  });

  test("onRemove", function(assert) {
    let component = this.owner.factoryFor('component:provider-directory').create({
      providers: A([{id: "1"}, {id: "2"}, {id: "3"}])
    });

    component._onRemove([{id: "1"}, {id: "3"}]);

    assert.equal(component.get("providers")[0].id, "2");
  });

  test("onCancel", function(assert) {
    let component = this.owner.factoryFor('component:provider-directory').create({
      provider: {id: "1"}
    });

    component._onCancel([{id: "1"}, {id: "3"}]);

    assert.equal(component.get("provider.id"), null);
  });
});
