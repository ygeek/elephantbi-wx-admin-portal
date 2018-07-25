import React from 'react';
import { Router, Route } from 'dva/router';
import dynamic from 'dva/dynamic';
import creatRoute from 'routes';

const RouterConfig = ({ history, app }) => {
  const goBack = () => {
    history.goBack();
  };

  const creatDynamic = props => dynamic({
    ...props,
    app
  });

  const routeChild = creatRoute(app, goBack);

  const Layout = creatDynamic({
    component: () => import('./routes/Layout')
  })

  return (
    <Router history={history}>
      <Route path="/" component={() => {
        return (
          <Layout>{routeChild}</Layout>
        )
      }} />
    </Router>
  )
}

export default RouterConfig;
