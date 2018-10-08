import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import { getOwner } from '@ember/application';
import { isEmpty } from '@ember/utils';
import { A } from '@ember/array';
import {v4} from "ember-uuid";
import RSVP from 'rsvp';

export default Component.extend({
  classNames: ["provider-directory"],

  // Params
  providers: computed({
    get(){
      return A();
    },
    set(_,v){
      return v;
    }
  }),

  provider: computed({
    get(){
      return this.getNewProvider();
    },
    set(_,v) {
      return v;
    }
  }),

  getNewProvider(){
    return getOwner(this).lookup("object:provider", {singleton: false});
  },

  actions: {
    onSubmit(provider){
      return this._onSubmit(provider);
    },

    onEdit(provider){
      this._onEdit(provider);
    },

    onRemove(providers){
      this._onRemove(providers);
    },

    onCancel(){
      this._onCancel();
    }
  },

  _onSubmit(provider){
    return new RSVP.Promise(resolve => {
      let id = get(provider, "id");
      let providers = get(this, "providers");

      if(isEmpty(id)) {
        set(provider, "id", v4());
        providers.addObject(provider);
      } else {
        let editProvider = providers.findBy("id", id);
        editProvider.setProperties({
          lastName: get(provider, "lastName"),
          firstName: get(provider, "firstName"),
          emailAddress: get(provider, "emailAddress"),
          specialty: get(provider, "specialty"),
          practiceName: get(provider, "practiceName")
        });
      }

      let newProvider = this.getNewProvider();
      set(this, "provider", newProvider);

      resolve(newProvider);
    });
  },

  _onEdit(provider){
    let providerCopy = this.getNewProvider();
    providerCopy.setProperties({
      id: get(provider, "id"),
      lastName: get(provider, "lastName"),
      firstName: get(provider, "firstName"),
      emailAddress: get(provider, "emailAddress"),
      specialty: get(provider, "specialty"),
      practiceName: get(provider, "practiceName")
    });
    set(this, "provider", providerCopy);
  },

  _onRemove(providers){
    let removeProviderIds = providers.mapBy("id");

    set(this, "providers", get(this, "providers").filter(provider => {
      return !removeProviderIds.includes(get(provider, "id"));
    }));
  },

  _onCancel(){
    set(this, "provider", this.getNewProvider());
  }

});
