import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { next } from '@ember/runloop';

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

  isSaving: false,

  actions: {
    onSubmitProvider(){
      let submitProvider = get(this, "submitProvider");
      if(submitProvider){
        set(this, "isSaving", true);

        // To clear out strange ember-cp-validations glitch
        next(() => {
          submitProvider(get(this, "provider")).finally(() => {
            set(this, "isSaving", false);
          });
        });
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
