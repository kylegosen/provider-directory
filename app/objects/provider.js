import EmberObject from '@ember/object';
import { validator, buildValidations } from 'ember-cp-validations';

const ProviderValidations = buildValidations({
  // TODO Add more validations
  lastName: [
    validator('presence', true)
  ],
  firstName: [
    validator('presence', true)
  ],
  emailAddress: [
    validator('presence', true),
    validator('format', { type: 'email' })
  ],
  specialty: [
    validator('presence', true)
  ],
  practiceName: [
    validator('presence', true)
  ]
});

export default EmberObject.extend(ProviderValidations, {
  lastName: null,
  firstName: null,
  emailAddress: null,
  specialty: null,
  practiceName: null
});
