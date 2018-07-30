import pathToRegexp from 'path-to-regexp';
import _ from 'lodash'
import Message from 'antd/lib/message'
import 'antd/lib/message/style/css'
import { redirect, fetchUserProfile } from '../services/example'

const getWebsitehost = (env) => {
  switch(env) {
    case 'develop':
      return 'www.flexceed.com';
    case 'stage':
      return 'www.visionpsn.com';
    case 'product':
    default:
      return 'www.elephantbi.com';
  }
}

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
        if (match) {
          if (search) {
            const matchSearch = search.match(/auth_code=(.*)/)
            if (matchSearch) {
              const authCode = matchSearch[1]
              dispatch({ type: 'setAuthCode', payload: authCode });
              dispatch({ type: 'login' })
            }
          } else {
            dispatch({ type: 'checkToken' })
            dispatch({ type: 'fetchUserProfile' })
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
        window.location.href = `https://${getserverhost(window.env)}`;
      }
    },

    * checkToken(action, { select, call, put }) {
      const { token } = yield select(state => state.currentUser);
      console.log('checkToken token', token)
      if (!token) {
        console.log('无token')
        Message.warning('您没有访问权限，请返回主页重新登录')
        setTimeout(() => {
          window.location.href = `https://${getWebsitehost(window.env)}`;
        }, 2000)
      }
    },

    * fetchUserProfile(action, { call }) {
      const { data, err } = yield call(fetchUserProfile);
      if (err) {
        if (err.status === 401) {
          console.log('token已过期')
          Message.warning('登录凭证已过期，请返回首页重新登录');
          setTimeout(() => {
            window.location.href = `https://${getWebsitehost(window.env)}`;
          }, 2000)
        }
      }
    },

    * clearLocalToken(action, { select, call, put }) {
      yield put({ type: 'clearState' });
      localStorage.removeItem('reduxState');
      window.location.href = `https://${getWebsitehost(window.env)}`
    }
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
    clearState(state, { payload }) {
      return {
        ...state,
        authCode: null,
        token: null,
        corpId: null,
      }
    }
  }
}