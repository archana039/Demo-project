export const ApiRoutes = {

    LOGIN: {
      service: '',
      url: '/login',
      method: 'POST',
      authenticate: false,
    },
    SIGNUP: {
      service: '',
      url: '/signup',
      method: 'POST',
      authenticate: false,
    },
    UPDATE_PROFILE: {
      service: '',
      url: '/updateProfile',
      method: 'POST',
      authenticate: true,
    },
    VERIFY_USER: {
      service: '',
      url: '/verify',
      method: 'GET',
      authenticate: true,
    },
     GET_USER_PROFILE:{
      service: '',
      url: '/getUserData',
      method: 'GET',
      authenticate: true,
     }
  };
  