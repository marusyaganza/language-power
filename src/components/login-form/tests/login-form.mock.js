const result = {
  email: 'test@test.com',
  password: 'mypassword77!'
};

export const signUpResult = { ...result, name: 'John Doe' };

export const reqParams = {
  requestOptions: {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result),
    method: 'POST'
  },
  url: 'undefined/api/user/login'
};

export const signUpReqParams = {
  requestOptions: {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signUpResult),
    method: 'POST'
  },
  url: 'undefined/api/user/signup'
};

export const fetchWordReq = {
  requestOptions: {
    headers: { Authorization: 'Bearer token' }
  },
  url: 'undefined/api/words/'
};
