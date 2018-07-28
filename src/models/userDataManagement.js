import pathToRegexp from 'path-to-regexp';
import { fetchUserInfoList } from 'services/example.js'
import _ from 'lodash'

export default {
  namespace: 'userDataManagement',
  
  state: {
    userInfo: [],
    pageInfo: {
      page: 1,
      pageSize: 20
    },
    total: 0,
    loading: 0,
  },
  
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const { pathname } = location;
        const match = pathToRegexp('/userDataManagement').exec(pathname)
        if (match) {
          dispatch({ type: 'fetchUserInfoList' })
        }
      })
    }
  },
  
  effects: {
    * fetchUserInfoList(action, { select, call, put }) {
      yield put({ type: 'changeLoading', payload: 'add' })
      const { pageInfo } = yield select(state => state.userDataManagement)
      const { data } = yield call(fetchUserInfoList, {
        page: pageInfo.page,
        page_size: pageInfo.pageSize
      });
      if (data) {
        yield put({ type: 'setUserInfoList', payload: data.list });
        yield put({ type: 'setTotalCount', payload: _.get(data, 'meta.total_count') })
        yield put({ type: 'changeLoading', payload: 'sub' })
      }
    },
  },
  
  reducers: {
    setUserInfoList(state, { payload }) {
      return { ...state, userInfo: payload }
    },
    setPageInfo(state, { payload }) {
      return { ...state, pageInfo: payload }
    },
    setTotalCount(state, { payload }) {
      return { ...state, total: payload }
    },
    changeLoading(state, { payload }) {
      return { ...state, loading: payload === 'add' ? state.loading + 1 : state.loading - 1 }
    }
  }
}