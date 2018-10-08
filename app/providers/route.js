import Route from '@ember/routing/route';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { v4 } from 'ember-uuid';

export default Route.extend({
  providerService: service("provider"),

  model(){
    let providerService = get(this, "providerService");

    // TODO Replace with Mirage - Should be real model as well instead of Provider object
    return A([
      providerService.createProvider(v4(), "Harris", "Mike", "mharris@updox.com", "Pediatrics", "Harris Pediatrics"),
      providerService.createProvider(v4(), "Wijoyo", "Bimo", "bwijoyo@updox.com", "Podiatry", "Wijoyo Podiatry"),
      providerService.createProvider(v4(), "Rose", "Nate", "nrose@updox.com", "Surgery", "Rose Cutters"),
      providerService.createProvider(v4(), "Carlson", "Mike", "mcarlson@updox.com", "Orthopedics", "Carlson Orthopedics"),
      providerService.createProvider(v4(), "Witting", "Mike", "mwitting@updox.com", "Pediatrics", "Witting’s Well Kids Pediatrics"),
      providerService.createProvider(v4(), "Juday", "Tobin", "tjuday@updox.com", "General Medicine", "Juday Family Practice"),
    ]);
  }
});
