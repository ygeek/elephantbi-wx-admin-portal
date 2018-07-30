import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';

const creatRoute = (app, goBack) => {
  const creatDynamic = props => dynamic({
    ...props,
    app
  });

  const UserDataManage = creatDynamic({
    component: () => import('./UserDataManage'),
    models: [import('../models/userDataManagement')]
  })

  const DashBoard = creatDynamic({
    component: () => import('./DashBoard'),
    models: [import('../models/dashBoard')],
  })

  const DataSource = creatDynamic({
    component: () => import('./DataSource'),
    models: [import('../models/dataSource')],
  })

  const AccountCancellation = creatDynamic({
    component: () => import('./AccountCancellation'),
  })
  console.log('route/index.js')
  return (
    <Switch>
      <Route exact path="/" component={UserDataManage}/>
      <Route path="/dashBoard/:id" component={DashBoard} />
      <Route path="/dataSource/:id" component={DataSource} />
      <Route path="/accountCancellation" component={AccountCancellation} />
    </Switch>
  )
}

export default creatRoute;