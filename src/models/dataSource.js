import pathToRegexp from 'path-to-regexp';

export default {
  namespace: 'dataSource',
  
  state: {
    dashBoardList: [],
  },
  
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const { pathname } = location;
        const match = pathToRegexp('/dataSource/:id').exec(pathname)
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