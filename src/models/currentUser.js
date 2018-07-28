import pathToRegexp from 'path-to-regexp';
import _ from 'lodash'
import { redirect } from '../services/example'

export default {
  namespace: 'currentUser',

  state: {
    authCode: null,
    token: null,
    corpId: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const { pathname, search } = location;
        const match = pathToRegexp('/(.*)').exec(pathname);
        console.log('match', match)
        if (match) {
          if (search) {
            const matchSearch = search.match(/auth_code=(.*)/)
            if (matchSearch) {
              const authCode = matchSearch[1]
              dispatch({ type: 'setAuthCode', payload: authCode });
              dispatch({ type: 'login' })
            }
          }
        }
      })
    }
  },

  effects: {
    * login(action, { select, call, put }) {
      const { authCode } = yield select(state => state.currentUser);
      const { data } = yield call(redirect, {
        auth_code: authCode,
        env: window.env,
      })
      if (data) {
        const corpId = _.get(data, 'corp_id');
        const token = _.get(data, 'access_token');
        yield put({ type: 'setToken', payload: token })
        yield put({ type: 'setCorpId', payload: corpId })

        const getserverhost = (env) => {
          switch(env) {
            case 'develop':
              return 'weixin.flexceed.com';
            case 'stage':
              return 'weixin.visionpsn.com';
            case 'product':
            default :
              return 'weixin.elephantbi.com';
          }
        }
        window.location.href = getserverhost(window.env);
      }
    },
  },

  reducers: {
    setAuthCode(state, { payload }) {
      return { ...state, authCode: payload }
    },
    setToken(state, { payload }) {
      return { ...state, token: payload }
    },
    setCorpId(state, { payload }) {
      return { ...state, corpId: payload }
    },
  }
}