import pathToRegexp from 'path-to-regexp';

export default {
  namespace: 'dashBoard',
  
  state: {
    dashBoardList: [],
  },
  
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const { pathname } = location;
        const match = pathToRegexp('/dashBoard/:id').exec(pathname)
        if (match) {
        }
      })
    }
  },
  
  effects: {
  },
  
  reducers: {
  }
}