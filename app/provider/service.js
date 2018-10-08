import Service from '@ember/service';
import { getOwner } from '@ember/application';

export default Service.extend({

  createProvider(id, lastName, firstName, emailAddress, specialty, practiceName){
    let provider = getOwner(this).lookup("object:provider", {singleton: false});
    provider.setProperties({
      id: id,
      lastName: lastName,
      firstName: firstName,
      emailAddress: emailAddress,
      specialty: specialty,
      practiceName: practiceName
    });
    return provider;
  }

});
