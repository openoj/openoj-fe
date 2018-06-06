import * as service from '../services/problem';
import pages from '../../../configs/pages';

let initialState = {
  list: {
    data: [],
    page: null,
    total: null,
    title: null,
  },
  detail: {
    source: null,
    content: null,
  }
};

export default {
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
    * getList({ payload: query = { page: 1 } }, { call, put }) {
      let ret = yield call(service.getList, query);
      yield put({
        type: 'save',
        payload: { item: 'list', ret },
      });
      return ret;
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === pages.problem.index) {
          dispatch({ type: 'getList', payload: query });
        }
      });
    },
  },
};
