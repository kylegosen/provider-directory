import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default Component.extend({
  classNames: ["provider-form flex-column"],

  // Params
  provider: null,
  submitProvider: null,
  cancelProvider: null,

  title: computed("provider.id", {
    get(){
      return isEmpty(get(this, "provider.id")) ? "Create Provider" : "Edit Provider";
    }
  }),

  actions: {
    onSubmitProvider(){
      let submitProvider = get(this, "submitProvider");
      if(submitProvider){
        submitProvider(get(this, "provider"));
      }
    },

    onCancel(){
      let cancelProvider = get(this, "cancelProvider");
      if(cancelProvider){
        cancelProvider();
      }
    }
  }

});
