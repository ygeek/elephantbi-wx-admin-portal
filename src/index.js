import dva from 'dva';
import './global.css';

const app = dva();

app.router(require('./router').default);

app.start('#root');