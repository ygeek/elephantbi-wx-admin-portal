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
    }
  },
  
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const { pathname } = location;
        const match = pathToRegexp('/dashBoard/:id').exec(pathname)
        if (match) {
          dispatch({ type: 'setUserId', payload: match[1] })
          dispatch({ type: 'fetchUsers' })
          dispatch({ type: 'fetchDashBoardList' })
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

    * fetchDashBoardList(action, { select, call, put }) {
      const { userId, pageInfo } = yield select(state => state.dashBoard);
      const { data } = yield call(fetchDashBoardList, userId, {
        page: pageInfo.page,
        page_size: pageInfo.pageSize
      });
      if (data) {
        yield put({ type: 'setDashBoardList', payload: data.list })
      }
    },

    * deleteDashBoard({ payload }, { select, call, put }) {
      const { data } = yield call(deleteDashBoard, payload);
      if (data) {
        yield put({ type: 'setPageInfo', payload: { page: 1, pageSize: 20 } })
        yield put({ type: 'fetchDashBoardList' })
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

    setDashBoardList(state, { payload }) {
      return { ...state, dashBoardList: payload }
    },

    setPageInfo(state, { payload }) {
      return { ...state, pageInfo: payload }
    }
  }
}