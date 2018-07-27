import pathToRegexp from 'path-to-regexp';
import { fetchUserInfoList, fetchDashBoardList, deleteDashBoard } from 'services/example.js'
import _ from 'lodash'

export default {
  namespace: 'dashBoard',
  
  state: {
    dashBoardList: [],
    userId: null,
    currentViewUser: null,
    pageInfo: {
      page: 1,
      pageSize: 20,
    },
    total: 0,
    loading: 0,
  },
  
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const { pathname } = location;
        const match = pathToRegexp('/dashBoard/:id').exec(pathname)
        if (match) {
          dispatch({ type: 'clearState' })
          dispatch({ type: 'setUserId', payload: match[1] })
          dispatch({ type: 'fetchUsers' })
          dispatch({ type: 'fetchDashBoardList' })
        }
      })
    }
  },
  
  effects: {
    * fetchUsers(action, { select, call, put }) {
      yield put({ type: 'changeLoading', payload: 'add' })
      const { userId } = yield select(state => state.dashBoard);
      const { data } = yield call(fetchUserInfoList);
      if (data) {
        const currentViewUser = _.find(data, { id: parseInt(userId, 10) });
        yield put({ type: 'setCurrentViewUser', payload: currentViewUser })
      }
      yield put({ type: 'changeLoading', payload: 'sub' })
    },

    * fetchDashBoardList(action, { select, call, put }) {
      yield put({ type: 'changeLoading', payload: 'add' })
      const { userId, pageInfo } = yield select(state => state.dashBoard);
      const { data } = yield call(fetchDashBoardList, userId, {
        page: pageInfo.page,
        page_size: pageInfo.pageSize
      });
      if (data) {
        yield put({ type: 'setDashBoardList', payload: data.list })
        yield put({ type: 'setTotalCount', payload: _.get(data, 'meta.total_count') })
      }
      yield put({ type: 'changeLoading', payload: 'sub' })
    },

    * deleteDashBoard({ payload }, { select, call, put }) {
      yield put({ type: 'changeLoading', payload: 'add' })
      const { data } = yield call(deleteDashBoard, payload);
      if (data) {
        yield put({ type: 'setPageInfo', payload: { page: 1, pageSize: 20 } })
        yield put({ type: 'fetchDashBoardList' })
      }
      yield put({ type: 'changeLoading', payload: 'sub' })
    }
  },
  
  reducers: {
    setUserId(state, { payload: userId }) {
      return { ...state, userId }
    },

    setCurrentViewUser(state, { payload }) {
      return { ...state, currentViewUser: payload }
    },

    setDashBoardList(state, { payload }) {
      return { ...state, dashBoardList: payload }
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
        dashBoardList: [],
        userId: null,
        currentViewUser: null,
        pageInfo: {
          page: 1,
          pageSize: 20,
        },
        total: 0,
        loading : 0
      }
    },
    changeLoading(state, { payload }) {
      return { ...state, loading: payload === 'add' ? state.loading + 1 : state.loading - 1 }
    }
  }
}