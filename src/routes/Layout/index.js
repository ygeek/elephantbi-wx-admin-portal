import React from 'react';
import Navigator from '../../components/navigator';
import styles from './index.less';

const Layout = ({ children }) => {
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

