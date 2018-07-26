import pathToRegexp from 'path-to-regexp';
import { fetchUserInfoList, fetchDataSourceList } from 'services/example.js'
import _ from 'lodash'

export default {
  namespace: 'dataSource',
  
  state: {
    dataSourceList: [],
    userId: null,
    currentViewUser: null,
    pageInfo: {
      page: 1,
      pageSize: 20,
    }
  },
  
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const { pathname } = location;
        const match = pathToRegexp('/dataSource/:id').exec(pathname)
        if (match) {
          dispatch({ type: 'setUserId', payload: match[1] })
          dispatch({ type: 'fetchUsers' })
          dispatch({ type: 'fetchDataSourceList' })
        }
      })
    }
  },
  
  effects: {
    * fetchUsers(action, { select, call, put }) {
      const { userId } = yield select(state => state.dashBoard);
      const { data } = yield call(fetchUserInfoList);
      if (data) {
        const currentViewUser = _.find(data, { id: parseInt(userId, 10) });
        yield put({ type: 'setCurrentViewUser', payload: currentViewUser })
      }
    },

    * fetchDataSourceList(action, { select, call, put }) {
      const { userId, pageInfo } = yield select(state => state.dashBoard);
      const { data } = yield call(fetchDataSourceList, userId, {
        page: pageInfo.page,
        page_size: pageInfo.pageSize
      });
      if (data) {
        yield put({ type: 'setDataSourceList', payload: data })
      }
    }
  },
  
  reducers: {
    setUserId(state, { payload: userId }) {
      return { ...state, userId }
    },

    setCurrentViewUser(state, { payload }) {
      return { ...state, currentViewUser: payload }
    },

    setDataSourceList(state, { payload }) {
      return { ...state, dataSourceList: payload }
    },

    setPageInfo(state, { payload }) {
      return { ...state, pageInfo: payload }
    }
  }
}