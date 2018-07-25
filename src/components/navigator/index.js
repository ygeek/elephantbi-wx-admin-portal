import React from 'react';
import Tabs from 'antd/lib/tabs';
import 'antd/lib/tabs/style/css';
import styles from './index.less';

const { TabPane } = Tabs;

const Navigator = () => {
  return (
    <div className={styles.container}>
      <Tabs>
        <TabPane tab="用户数据管理" key="1" />
        <TabPane tab="企业帐号注销" key="2" />
      </Tabs>
    </div>

  )
}

export default Navigator;