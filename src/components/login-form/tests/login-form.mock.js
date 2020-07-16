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
  url: 'host/api/user/login'
};

export const signUpReqParams = {
  requestOptions: {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signUpResult),
    method: 'POST'
  },
  url: 'host/api/user/signup'
};

export const fetchWordReq = {
  requestOptions: {
    headers: { Authorization: 'Bearer token' }
  },
  url: 'host/api/words/'
};
