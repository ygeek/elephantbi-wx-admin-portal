import pathToRegexp from 'path-to-regexp';
import { fetchUserInfoList } from 'services/example.js'

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
        const match = pathToRegexp('/').exec(pathname)
        if (match) {
          dispatch({ type: 'fetchUserInfoList' })
        }
      })
    }
  },
  
  effects: {
    * fetchUserInfoList(action, { select, call, put }) {
      const { pageInfo } = yield select(state => state.userDataManagement)
      console.log('env', window.env)
      console.log('host', window.host)
      console.log('backend_url', window.backendUrl)
      const { data } = yield call(fetchUserInfoList, {
        page: pageInfo.page,
        page_size: pageInfo.pageSize
      });
      if (data) {
        yield put({ type: 'setUserInfoList', payload: data.list });
      }
    },
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