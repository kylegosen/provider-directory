import Component from '@ember/component';
import { set, get } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { getOwner } from '@ember/application';

export default Component.extend({
  classNames: ["provider-form flex-column"],

  // Params
  create: null,

  provider: null,

  init(){
    this._super(...arguments);

    if(isEmpty(get(this, "provider"))) {
      this.resetProvider();
    }
  },

  resetProvider(){
    let provider = getOwner(this).lookup("object:provider", {singleton: false});
    set(this, "provider", provider);
  },

  actions: {
    create(){
      let create = get(this, "create");
      if(create){
        create(get(this, "provider"));
      }
      this.resetProvider();
    }
  }

});
