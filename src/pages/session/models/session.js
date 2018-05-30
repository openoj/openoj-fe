import * as sessionService from '../services/session';

export default {
  namespace: 'session',
  state: {
    status: {
      logged_in: false,
      user: {},
    }
  },
  reducers: {
    save(state, { payload: { data: status } }) {
      return { ...state, status };
    },
  },
  effects: {
    * fetch({ payload: {_} }, { call, put }) {
      const data = yield call(sessionService.fetch);
      yield put({
        type: 'save',
        payload: { data },
      });
    },
    * reload(action, { put }) {
      yield put({ type: 'fetch', payload: {} });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/session') {
          dispatch({ type: 'fetch', payload: {} });
        }
      });
    },
  },
};
