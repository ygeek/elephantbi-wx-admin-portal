import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';

const RouterConfig = ({ history, app }) => {

  const creatDynamic = props => dynamic({
    ...props,
    app
  });

  const UserDataManage = creatDynamic({
    component: () => import('routes/UserDataManage'),
    models: [import('models/userDataManagement')]
  })

  const DashBoard = creatDynamic({
    component: () => import('routes/DashBoard'),
    models: [import('models/dashBoard')],
  })

  const DataSource = creatDynamic({
    component: () => import('routes/DataSource'),
    models: [import('models/dataSource')],
  })

  const AccountCancellation = creatDynamic({
    component: () => import('routes/AccountCancellation'),
  })

  const Layout = creatDynamic({
    component: () => import('./routes/Layout')
  })
  console.log('router.js')
  return (
    <Router history={history}>
      <Route path="/" component={() => {
        return (
          <Layout>
            <Switch>
              <Route exact path="/" component={() => {
                return <Redirect to="/userDataManagement" />
              }}/>
              <Route path="/userDataManagement" component={UserDataManage} />
              <Route path="/dashBoard/:id" component={DashBoard} />
              <Route path="/dataSource/:id" component={DataSource} />
              <Route path="/accountCancellation" component={AccountCancellation} />
            </Switch>
          </Layout>
        )
      }} />
    </Router>
  )
}

export default RouterConfig;
