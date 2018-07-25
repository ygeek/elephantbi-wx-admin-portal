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
  })

  const DashBoard = creatDynamic({
    component: () => import('./DashBoard'),
  })

  const DataSource = creatDynamic({
    component: () => import('./DataSource')
  })

  return (
    <Switch>
      <Route
        exact
        path="/"
        component={() => {
          return (<Redirect to="/userDataManage" />);
        }}
      />
      <Route path="/userDataManage" component={UserDataManage} />
      <Route path="/dashBoard/:id" component={DashBoard} />
      <Route path="/dataSource/:id" component={DataSource} />
    </Switch>
  )
}

export default creatRoute;