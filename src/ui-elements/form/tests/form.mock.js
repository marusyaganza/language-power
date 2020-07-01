import { VALIDATOR_EMAIL, VALIDATOR_PASSWORD } from '../../../utils/validators';

export const fields = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'test@test.com',
    id: 'email',
    label: 'Email',
    autoComplete: 'on',
    validators: [VALIDATOR_EMAIL()],
    errorText: 'please enter your email'
  },
  {
    name: 'password',
    id: 'password',
    type: 'password',
    label: 'Password',
    autoComplete: 'off',
    validators: [VALIDATOR_PASSWORD()],
    errorText:
      'password should contain 6 to 16 valid characters, at least 1 special character and one number'
  }
];

export const result = {
  email: {
    isValid: true,
    value: 'test@test.com'
  },
  password: {
    isValid: true,
    value: 'mypassword77!'
  }
};
