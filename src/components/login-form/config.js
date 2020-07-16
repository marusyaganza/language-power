import {
  VALIDATOR_EMAIL,
  VALIDATOR_PASSWORD,
  VALIDATOR_MINLENGTH
} from '../../utils/validators';

const loginInitialState = {
  isValid: false,
  inputs: {
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    }
  }
};

const signUpInitialState = {
  ...loginInitialState,
  inputs: {
    ...loginInitialState.inputs,
    name: {
      value: '',
      isValid: false
    }
  }
};

const loginFields = [
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

const signUpFields = [
  {
    name: 'name',
    placeholder: 'John Doe',
    type: 'text',
    id: 'name',
    label: 'Name',
    autoComplete: 'on',
    validators: [VALIDATOR_MINLENGTH(2)],
    errorText: 'name should have at least 2 symbols'
  },
  ...loginFields
];

export const config = {
  signUpConfig: {
    formConfig: {
      fields: signUpFields,
      initialState: signUpInitialState
    },
    texts: {
      changeModeButtonText: 'login',
      changeModeText: 'Already have an account?'
    }
  },
  loginConfig: {
    formConfig: {
      fields: loginFields,
      initialState: loginInitialState
    },
    texts: {
      changeModeButtonText: 'sign up',
      changeModeText: 'Do not have an account? Sign up, it is free!'
    }
  }
};
