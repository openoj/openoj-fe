import * as sessionService from '../services/session';

let initialState = {
  status: {
    logged_in: false,
    user: {},
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
    clear(state, { payload: item }) {
      let newState = { ...state };
      newState[item] = { ...initialState[item] };
      return newState;
    },
    saveStatus(state, { payload: { ret: status } }) {
      return { ...state, status };
    },
    saveLogin(state, { payload: { ret: login } }) {
      return { ...state, login };
    },
    saveLogout(state, { payload: { ret: logout } }) {
      return { ...state, logout };
    },
  },
  effects: {
    * fetch(action, { call, put }) {
      const ret = yield call(sessionService.fetch);
      yield put({
        type: 'saveStatus',
        payload: { ret },
      });
    },
    * reload(action, { put }) {
      yield put({ type: 'fetch' });
    },
    * login({ payload: data }, { call, put }) {
      let ret = yield call(sessionService.login, data);
      if(ret.csrfmiddlewaretoken) {
        ret = yield call(sessionService.getAccessToken, ret.csrfmiddlewaretoken);
      }
      yield put({
        type: 'saveLogin',
        payload: { ret },
      });
    },
    * logout(action, { call, put }) {
      let ret = yield call(sessionService.logout);
      if(ret.result === 'succeeded') {
        yield put({
          type: 'saveLogout',
          payload: { ret },
        });
        yield put({
          type: 'clear',
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
