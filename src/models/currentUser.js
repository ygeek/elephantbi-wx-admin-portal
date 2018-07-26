import pathToRegexp from 'path-to-regexp';
import { redirect } from '../services/example'

export default {
  namespace: 'currentUser',

  state: {
    authCode: null,
    token: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const { pathname, search } = location;
        console.log('location', location)
        console.log('search', search)
        const match = pathToRegexp('/(.*)').exec(pathname);
        console.log('match', match)
        if (match) {
          const matchAuthCode = search.match(/auth_code=(\w*)/)
          console.log('matchAuthCode', matchAuthCode)
          if (matchAuthCode) {
            const authCode = matchAuthCode[1];
            dispatch({ type: 'setAuthCode', payload: authCode })
            dispatch({ type: 'login' });
          }
        }
      })
    }
  },

  effects: {
    * login(action, { select, call, put }) {
      const { authCode } = yield select(state => state.currentUser);
      yield call(redirect, {
        auth_code: authCode,
        env: 'develop',
        redirect_url: 'https://weixin.flexceed.com'
      })
    },
  },

  reducers: {
    setAuthCode(state, { payload }) {
      return { ...state, authCode: payload }
    },
    setToken(state, { payload }) {
      return { ...state, token: payload }
    }
  }
}