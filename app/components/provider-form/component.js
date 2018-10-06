import Component from '@ember/component';
import { set, get } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { getOwner } from '@ember/application';

export default Component.extend({
  classNames: ["provider-form flex-column"],

  provider: null,

  init(){
    this._super(...arguments);

    if(isEmpty(get(this, "provider"))) {
      let owner = getOwner(this);
      let provider = owner.lookup("object:provider", {singleton: false});

      set(this, "provider", provider);
    }
  },

  resetForm(){
    this.setProperties({
      lastName: null,
      firstName: null,
      emailAddress: null,
      specialty: null,
      practiceName: null
    });
  },

  actions: {
    submit(){
      // TODO
      console.log("onSubmit")
    }
  }

});
