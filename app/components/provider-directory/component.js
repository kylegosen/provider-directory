import Component from '@ember/component';
import { get } from '@ember/object';

export default Component.extend({
  classNames: ["provider-directory"],

  // Params
  providers: null,

  actions: {
    create(provider){
      get(this, "providers").addObject(provider);
    }
  }

});
