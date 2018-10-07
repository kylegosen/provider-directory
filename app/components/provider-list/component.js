import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { sort, notEmpty } from '@ember/object/computed';
import { isEmpty } from '@ember/utils';

export default Component.extend({
  classNames: ["provider-list provider-content"],

  // Params
  providers: null,

  hasProviders: notEmpty("providersSorted"),
  hasFilter: notEmpty("filterBy"),

  filterBy: null,
  providersFiltered: computed("providers.[]", "filterBy", {
    get(){
      let filterBy = get(this, "filterBy");
      let providers = get(this, "providers");

      if(isEmpty(filterBy)){
        return providers;
      }

      filterBy = filterBy.toLowerCase();

      return providers.filter(provider => {
        return get(provider, "lastName").toLowerCase().includes(filterBy)
          || get(provider, "firstName").toLowerCase().includes(filterBy)
          || get(provider, "emailAddress").toLowerCase().includes(filterBy)
          || get(provider, "specialty").toLowerCase().includes(filterBy)
          || get(provider, "practiceName").toLowerCase().includes(filterBy);
      });
    }
  }),

  sortingOptions: computed({
    get(){
      return [
        {id: "lastName", name: "Last Name"},
        {id: "firstName", name: "First Name"},
        {id: "emailAddress", name: "Email Address"},
        {id: "specialty", name: "Specialty"},
        {id: "practiceName", name: "Practice Name"}]
    }
  }),

  selectedSort: computed({
    get(){
      return get(this, "sortingOptions").find(({id}) => id === "lastName");
    },
    set(_,v){
      return v;
    }
  }),

  sorting: computed("selectedSort.id", {
    get(){
      let selectedSort = get(this, "selectedSort");
      if(isEmpty(selectedSort)){
        return ["lastName:asc"];
      }

      return [`${get(selectedSort, "id")}:asc`, "lastName:asc", "firstName:asc"];
    }
  }),
  providersSorted: sort("providersFiltered", "sorting"),

  actions: {
    remove(){
      // TODO
    }
  }

});
