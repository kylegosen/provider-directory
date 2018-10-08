import EmberObject from '@ember/object';
import { validator, buildValidations } from 'ember-cp-validations';

const ProviderValidations = buildValidations({
  // TODO Any more validations needed?
  lastName: [
    validator('presence', true),
    validator('format', {
      regex: /^([a-zA-Z'\- ]+)$/,
      message: "This field may only contain letters, spaces, hyphens, single quotes and periods"
    })
  ],
  firstName: [
    validator('presence', true),
    validator('format', {
      regex: /^([a-zA-Z'\- ]+)$/,
      message: "This field may only contain letters, spaces, hyphens, single quotes and periods"
    })
  ],
  emailAddress: [
    validator('presence', true),
    validator('format', { type: 'email' })
  ],
  specialty: [

  ],
  practiceName: [

  ]
});

export default EmberObject.extend(ProviderValidations, {
  id: null,
  lastName: null,
  firstName: null,
  emailAddress: null,
  specialty: null,
  practiceName: null
});
