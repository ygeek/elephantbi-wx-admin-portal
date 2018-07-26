import pathToRegexp from 'path-to-regexp';
import { fetchUserInfoList } from 'services/example.js'
import _ from 'lodash';
import { parseCookie } from 'utils/cookie_helper';

export default {
  namespace: 'userDataManagement',
  
  state: {
    userInfo: [],
    pageInfo: {
      page: 1,
      pageSize: 20
    }
  },
  
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const { pathname } = location;
        const match = pathToRegexp('/userDataManage').exec(pathname)
        if (match) {
          dispatch({ type: 'getToken' });
        }
      })
    }
  },
  
  effects: {
    * fetchUserInfoList(action, { select, call, put }) {
      const { pageInfo } = yield select(state => state.userDataManagement)
      const { data } = yield call(fetchUserInfoList, {
        page: pageInfo.page,
        page_size: pageInfo.pageSize
      });
      if (data) {
        yield put({ type: 'setUserInfoList', payload: data });
      }
    },
    * getToken(action, { select, call, put }) {
      const cookie = parseCookie();
      const token = _.get(cookie, 'BI_TOKEN');
      yield put({ type: 'currentUser/setToken', payload: token });
      yield put({ type: 'fetchUserInfoList' })
    }
  },
  
  reducers: {
    setUserInfoList(state, { payload }) {
      return { ...state, userInfo: payload }
    },
    setPageInfo(state, { payload }) {
      return { ...state, pageInfo: payload }
    }
  }
}