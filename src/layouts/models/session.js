import * as sessionService from '../services/session';

let initialState = {
  status: {
    logged_in: false,
    user: {},
  },
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
      return ret;
    },
    * reload(action, { put }) {
      yield put({ type: 'fetch' });
    },
    * login({ payload: data }, { call, put }) {
      let ret = yield call(sessionService.login, data);
      if(ret.result === 'success') {
        ret = yield call(sessionService.getAccessToken, ret.csrfmiddlewaretoken);
      }
      return ret;
    },
    * logout(action, { call, put }) {
      let ret = yield call(sessionService.logout);
      if(ret.result === 'success') {
        yield put({
          type: 'reset',
          payload: 'status',
        });
      }
      return ret;
    },
    * getRegisterVerificationCode({ payload: data }, { call, put }) {
      return yield call(sessionService.getRegisterVerificationCode, data);
    },
    * register({ payload: data }, { call, put }) {
      return yield call(sessionService.register, data);
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
