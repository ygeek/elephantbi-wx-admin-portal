import React from 'react';
import Spin from 'antd/lib/spin'
import 'antd/lib/spin/style/css'
import Navigator from '../../components/navigator';
import styles from './index.less';

const Layout = ({ children }) => {
  const matchAuthCode = window.location.search.match(/\?auth_code=(.*)/)
  if (matchAuthCode) {
    return (
      <Spin wrapperClassName={styles.spiningPage} spinning={true}><div /></Spin>
    );
  }
  return (
    <div className={styles.container}>
      <Navigator />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

export default Layout;

