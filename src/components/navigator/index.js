import React from 'react';
import Tabs from 'antd/lib/tabs';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import 'antd/lib/tabs/style/css';
import dataIcon from 'assets/data.jpg'
import cancelIcon from 'assets/cancel.jpg'
import styles from './index.less';
import { router } from 'sw-toolbox';

const { TabPane } = Tabs;

class Navigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: window.location.pathname === '/accountCancellation' ? '2' : '1'
    }
  }

  render() {
    const { dispatch } = this.props;
    const tabsOnChange = (key) => {
      if (key === "1") {
        dispatch(routerRedux.push('/'))
      }
      if (key === '2') {
        dispatch(routerRedux.push('/accountCancellation'))
      }
      this.setState({ activeTab: key })
    }
    return (
      <div className={styles.container}>
        <Tabs
          onChange={tabsOnChange}
          activeKey={this.state.activeTab}
        >
          <TabPane tab={<span><img src={dataIcon} alt="" />用户数据管理</span>} key="1" />
          <TabPane tab={<span><img src={cancelIcon} alt="" />企业帐号注销</span>} key="2" />
        </Tabs>
      </div>
    )
  }
}

export default connect()(Navigator);