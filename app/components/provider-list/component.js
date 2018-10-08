import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { sort, notEmpty, filterBy, gt } from '@ember/object/computed';
import { isEmpty } from '@ember/utils';

export default Component.extend({
  classNames: ["provider-list provider-content"],

  // Params
  providers: null,
  removeProviders: null,
  editProvider: null,

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

  sortDirectionOptions: computed({
    get(){
      return [
        {id: "asc", name: "Asc"},
        {id: "desc", name: "Desc"}]
    }
  }),

  selectedSortDirection: computed({
    get(){
      return get(this, "sortDirectionOptions").find(({id}) => id === "asc");
    },
    set(_,v){
      return v;
    }
  }),

  sorting: computed("selectedSort.id", "selectedSortDirection.id", {
    get(){
      let selectedSort = get(this, "selectedSort");
      if(isEmpty(selectedSort)){
        return ["lastName:asc"];
      }

      return [`${get(selectedSort, "id")}:${get(this, "selectedSortDirection.id")}`,
        "lastName:asc", "firstName:asc"];
    }
  }),
  providersSorted: sort("providersFiltered", "sorting"),

  removableProviders: filterBy("providers", "shouldRemove", true),
  hasRemovableProviders: gt("removableProviders.length", 0),

  actions: {
    onEdit(provider){
      let editProvider = get(this, "editProvider");
      if(editProvider){
        editProvider(provider);
      }
    },

    onRemove(){
      let removableProviders = get(this, "removableProviders");
      let removeProviders = get(this, "removeProviders");
      if(removableProviders){
        removeProviders(removableProviders);
      }
    }
  }

});
