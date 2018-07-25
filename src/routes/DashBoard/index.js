import React from 'react';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
import { connect } from 'dva';
import columns from './column';
import styles from './index.less'

const DashBoard = ({ dispatch }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>返回用户列表</div>
      <div>
        <Table
          columns={columns(dispatch)}
          dataSource={[{
            id: 1,
            name: 'wangshuai',
            create_at: '111',
            update_at: '222',
          }]}
        />
      </div>
    </div>
  )
}

export default connect()(DashBoard);