import React from 'react';
import Tabs from 'antd/lib/tabs';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import 'antd/lib/tabs/style/css';
import styles from './index.less';
import { router } from 'sw-toolbox';

const { TabPane } = Tabs;

const Navigator = ({ dispatch }) => {
  const tabsOnChange = (key) => {
    if (key === "1") {
      dispatch(routerRedux.push('/userDataManage'))
    }
    if (key === '2') {
      dispatch(routerRedux.push('/accountCancellation'))
    }
  }
  return (
    <div className={styles.container}>
      <Tabs onChange={tabsOnChange}>
        <TabPane tab="用户数据管理" key="1" />
        <TabPane tab="企业帐号注销" key="2" />
      </Tabs>
    </div>

  )
}

export default connect()(Navigator);