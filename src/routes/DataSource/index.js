import React from 'react';
import Table from 'antd/lib/table';
import { routerRedux } from 'dva/router';
import 'antd/lib/table/style/css';
import { connect } from 'dva';
import columns from './column';
import styles from './index.less'

const DataSource = ({ dispatch }) => {
  const toUserList = () => {
    dispatch(routerRedux.push('/userDataManage'))
  }
  return (
    <div className={styles.container}>
      <div className={styles.goback}>
        <button onClick={toUserList}>返回用户列表</button>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>王帅的数据源</div>
        <Table
          columns={columns(dispatch)}
          dataSource={[{
            id: 1,
            name: 'wangshuai',
            type: 'csv',
            size: '100M',
            description: '数据源描述',
            create_at: '111',
            update_at: '222',
          }]}
        />
      </div>
    </div>
  )
}

export default connect()(DataSource)