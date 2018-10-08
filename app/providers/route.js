import Route from '@ember/routing/route';
import { getOwner } from '@ember/application';
import { A } from '@ember/array';
import { v4 } from 'ember-uuid';

export default Route.extend({
  model(){
    // TODO Replace with Mirage - Should be real model as well instead of Provider object
    return A([
      this.createProvider("Harris", "Mike", "mharris@updox.com", "Pediatrics", "Harris Pediatrics"),
      this.createProvider("Wijoyo", "Bimo", "bwijoyo@updox.com", "Podiatry", "Wijoyo Podiatry"),
      this.createProvider("Rose", "Nate", "nrose@updox.com", "Surgery", "Rose Cutters"),
      this.createProvider("Carlson", "Mike", "mcarlson@updox.com", "Orthopedics", "Carlson Orthopedics"),
      this.createProvider("Witting", "Mike", "mwitting@updox.com", "Pediatrics", "Witting’s Well Kids Pediatrics"),
      this.createProvider("Juday", "Tobin", "tjuday@updox.com", "General Medicine", "Juday Family Practice"),
    ]);
  },

  createProvider(lastName, firstName, emailAddress, specialty, practiceName){
    let provider = getOwner(this).lookup("object:provider", {singleton: false});
    provider.setProperties({
      id: v4(),
      lastName: lastName,
      firstName: firstName,
      emailAddress: emailAddress,
      specialty: specialty,
      practiceName: practiceName
    });
    return provider;
  }
});
