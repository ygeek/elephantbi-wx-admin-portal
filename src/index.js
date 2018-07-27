import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import './global.css';

const getInitialState = () => {
  console.log('pppppppppppppp', localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {})
  return localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};
};

const app = dva({
  history: createHistory(),
  initialState: getInitialState(),
});

app.use({
  onStateChange: () => {
    const state = app._store.getState();
    const { currentUser } = state;
    console.log('oooooooooooo', currentUser)
    localStorage.setItem('reduxState', JSON.stringify({
      currentUser
    }));
  }
});

[
  'currentUser',
  'userDataManagement',
  'dashBoard',
  'dataSource',
].forEach((fileName) => {
  app.model(require(`./models/${fileName}.js`).default);
});

app.router(require('./router').default);

app.start('#root');