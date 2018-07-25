import React from 'react';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
import { connect } from 'dva';
import columns from './column';
import styles from './index.less'

const UserDataManage = ({ dispatch }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>用户管理</div>
      <div>
        <Table
          columns={columns(dispatch)}
          dataSource={[{
            id: 1,
            name: 'wangshuai',
            email: '15108387504@163.com',
            is_admin: 1,
            phone: '15108387504'
          }]}
        />
      </div>
    </div>
  )
}

export default connect()(UserDataManage);
