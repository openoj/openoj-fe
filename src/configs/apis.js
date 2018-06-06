export default {
  general: {
    csrf: '/api/csrf',
  },
  session: {
    status: '/api/session',
    registerVerificationCode: '/api/register_email',
    register: '/api/register',
    forgotPassword: '/api/forgot_password',
    login: '/api/login',
    logout: '/api/logout',
    oauth: '/api/o/authorize/',
  },
  problem: {
    index: '/api/set/1/',
  },
  contest: {
    acm: {
      index: '/api/set/',
    }
  },
};
