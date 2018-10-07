import Component from '@ember/component';
import { computed } from '@ember/object';
import { reads, sort } from '@ember/object/computed';

export default Component.extend({
  classNames: ["provider-list provider-content"],

  // Params
  providers: null,

  providersFiltered: reads("providers"), // TODO

  sorting: computed({
    get(){
      return ["lastName:asc", "firstName:asc"];
    }
  }),
  providersSorted: sort("providersFiltered", "sorting"),

  actions: {
    remove(){
      // TODO
    }
  }

});
