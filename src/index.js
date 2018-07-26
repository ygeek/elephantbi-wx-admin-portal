import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import './global.css';

const app = dva({
  history: createHistory(),
});

app.use({
  onStateChange: () => {
    const state = app._store.getState();
    const { currentUser } = state;

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

app.use({
  onStateChange: () => {
    const state = app._store.getState();
    const { currentUser } = state;

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