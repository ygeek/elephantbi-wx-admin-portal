import React from 'react';
import Alert from 'antd/lib/alert';
import 'antd/lib/alert/style/css';
import styles from './index.less';

const AccountCancellation = () => {
  return (
    <div className={styles.container}>
      <div className={styles.alert}>
        <Alert
            type="warning"
            showIcon
            message="提示：注销企业帐号是高度危险的操作，注销企业帐号后ElephantBI的数据源，仪表盘数据将全部删除，且无法恢复，请谨慎操作！"
        />
      </div>
      <div className={styles.tips}>
        <div className={styles.title}>使用场景</div>
        <div className={styles.content}>使用ElephantBI一段时间后，不再使用，想清除所有数据，包括帐号信息</div>
        <div className={styles.title}>操作步骤</div>
        <div>联系ElephantBI官方客服电话，0411-39026089，向客服申请注销企业，经审核后由ElephantBI安排工作人员注销企业帐号</div>
      </div>
    </div>
  )
}

export default AccountCancellation;