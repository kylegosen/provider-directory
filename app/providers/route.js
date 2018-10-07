import Route from '@ember/routing/route';
import { getOwner } from '@ember/application';
import { A } from '@ember/array';

export default Route.extend({
  model(){
    // TODO Replace with Mirage - Should be real model as well instead of Provider object
    let owner = getOwner(this);
    let provider = owner.lookup("object:provider", {singleton: false});

    return A([
      provider.setProperties({"lastName": "Harris", "firstName": "Mike", "emailAddress": "mharris@updox.com", "specialty": "Pediatrics", "practiceName": "Harris Pediatrics"}),
      provider.setProperties({"lastName": "Wijoyo", "firstName": "Bimo", "emailAddress": "bwijoyo@updox.com", "specialty": "Podiatry", "practiceName": "Wijoyo Podiatry"}),
      provider.setProperties({"lastName": "Rose", "firstName": "Nate", "emailAddress": "nrose@updox.com", "specialty": "Surgery", "practiceName": "Rose Cutters"}),
      provider.setProperties({"lastName": "Carlson", "firstName": "Mike", "emailAddress": "mcarlson@updox.com", "specialty": "Orthopedics", "practiceName": "Carlson Orthopedics"}),
      provider.setProperties({"lastName": "Witting", "firstName": "Mike", "emailAddress": "mwitting@updox.com", "specialty": "Pediatrics", "practiceName": "Witting’s Well Kids Pediatrics"}),
      provider.setProperties({"lastName": "Juday", "firstName": "Tobin", "emailAddress": "tjuday@updox.com", "specialty": "General Medicine", "practiceName": "Juday Family Practice"}),

      provider.setProperties({"lastName": "Harris", "firstName": "Mike", "emailAddress": "mharris@updox.com", "specialty": "Pediatrics", "practiceName": "Harris Pediatrics"}),
      provider.setProperties({"lastName": "Wijoyo", "firstName": "Bimo", "emailAddress": "bwijoyo@updox.com", "specialty": "Podiatry", "practiceName": "Wijoyo Podiatry"}),
      provider.setProperties({"lastName": "Rose", "firstName": "Nate", "emailAddress": "nrose@updox.com", "specialty": "Surgery", "practiceName": "Rose Cutters"}),
      provider.setProperties({"lastName": "Carlson", "firstName": "Mike", "emailAddress": "mcarlson@updox.com", "specialty": "Orthopedics", "practiceName": "Carlson Orthopedics"}),
      provider.setProperties({"lastName": "Witting", "firstName": "Mike", "emailAddress": "mwitting@updox.com", "specialty": "Pediatrics", "practiceName": "Witting’s Well Kids Pediatrics"}),
      provider.setProperties({"lastName": "Juday", "firstName": "Tobin", "emailAddress": "tjuday@updox.com", "specialty": "General Medicine", "practiceName": "Juday Family Practice"})
    ]);
  }
});
