import pathToRegexp from 'path-to-regexp';
import { fetchUserInfoList, fetchDataSourceList, deleteDataSource } from 'services/example.js'
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
    },
    total: 0
  },
  
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const { pathname } = location;
        const match = pathToRegexp('/dataSource/:id').exec(pathname)
        if (match) {
          dispatch({ type: 'clearState' })
          dispatch({ type: 'setUserId', payload: match[1] })
          dispatch({ type: 'fetchUsers' })
          dispatch({ type: 'fetchDataSourceList' })
        }
      })
    }
  },
  
  effects: {
    * fetchUsers(action, { select, call, put }) {
      const { userId } = yield select(state => state.dataSource);
      const { data } = yield call(fetchUserInfoList);
      if (data) {
        const currentViewUser = _.find(data, { id: parseInt(userId, 10) });
        yield put({ type: 'setCurrentViewUser', payload: currentViewUser })
      }
    },

    * fetchDataSourceList(action, { select, call, put }) {
      const { userId, pageInfo } = yield select(state => state.dataSource);
      const { data } = yield call(fetchDataSourceList, userId, {
        page: pageInfo.page,
        page_size: pageInfo.pageSize
      });
      if (data) {
        yield put({ type: 'setDataSourceList', payload: data.list });
        yield put({ type: 'setTotalCount', payload: _.get(data, 'meta.total_count') })
      }
    },

    * deleteDataSource({ payload }, { select, call, put }) {
      const { data } = yield call(deleteDataSource, payload)
      if (data) {
        yield put({ type: 'setPageInfo', payload: { page: 1, pageSize: 20 } })
        yield put({ type: 'fetchDataSourceList' })
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
    },

    setTotalCount(state, { payload }) {
      return { ...state, total: payload }
    },
    clearState(state) {
      return {
        ...state,
        dataSourceList: [],
        userId: null,
        currentViewUser: null,
        pageInfo: {
          page: 1,
          pageSize: 20,
        },
        total: 0
      }
    }
  }
}