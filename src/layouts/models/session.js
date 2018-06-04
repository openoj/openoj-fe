import * as sessionService from '../services/session';

let initialState = {
  status: {
    logged_in: false,
    user: {},
  },
  verificationCode: {
    result: null,
    code: '',
  },
  register: {
    result: null,
    msg: '',
    errors: {},
  },
  forgotPassword: {
    result: null,
    msg: '',
    errors: {},
  },
  login: {
    result: null,
    msg: '',
  },
  logout: {
    result: null,
    msg: '',
  }
};

export default {
  namespace: 'session',
  state: initialState,
  reducers: {
    save(state, { payload: { item, ret } }) {
      let newState = { ...state };
      newState[item] = { ...ret };
      return newState;
    },
    reset(state, { payload: item }) {
      let newState = { ...state };
      newState[item] = { ...initialState[item] };
      return newState;
    },
  },
  effects: {
    * fetch(action, { call, put }) {
      const ret = yield call(sessionService.fetch);
      yield put({
        type: 'save',
        payload: { item: 'status', ret },
      });
    },
    * reload(action, { put }) {
      yield put({ type: 'fetch' });
    },
    * login({ payload: data }, { call, put }) {
      let ret = yield call(sessionService.login, data);
      if(ret.result === 'succeeded') {
        ret = yield call(sessionService.getAccessToken, ret.csrfmiddlewaretoken);
      }
      yield put({
        type: 'save',
        payload: { item: 'login', ret },
      });
    },
    * logout(action, { call, put }) {
      let ret = yield call(sessionService.logout);
      if(ret.result === 'succeeded') {
        yield put({
          type: 'save',
          payload: { item: 'logout', ret },
        });
        yield put({
          type: 'reset',
          payload: 'status',
        });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        // if(pathname === '/session') {
        //   dispatch({ type: 'fetch' });
        // }
      });
    },
  },
};
