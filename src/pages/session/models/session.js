import * as sessionService from '../services/session';

export default {
  namespace: 'session',
  state: {
    status: {
      logged_in: false,
      user: {},
    },
    login: {
      result: null,
      msg: '',
    }
  },
  reducers: {
    saveStatus(state, { payload: { data: status } }) {
      return { ...state, status };
    },
    saveLogin(state, { payload: { retData: login } }) {
      return { ...state, login };
    },
    clearLogin(state) {
      const login = {
        result: null,
        msg: '',
      };
      return { ...state, login };
    },
  },
  effects: {
    * fetch(action, { call, put }) {
      const data = yield call(sessionService.fetch);
      yield put({
        type: 'saveStatus',
        payload: { data },
      });
    },
    * reload(action, { put }) {
      yield put({ type: 'fetch' });
    },
    * login({ payload: data }, { call, put }) {
      const retData = yield call(sessionService.login, data);
      yield put({
        type: 'saveLogin',
        payload: { retData },
      });
      // yield put({ type: 'reload' });
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
