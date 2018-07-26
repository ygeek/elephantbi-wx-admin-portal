import React from 'react';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import columns from './column';
import styles from './index.less'

const DashBoard = ({ dispatch }) => {
  const toUserList = () => {
    dispatch(routerRedux.push('/userDataManage'))
  }
  return (
    <div className={styles.container}>
      <div className={styles.goback}>
        <button onClick={toUserList}>返回用户列表</button>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>王帅的仪表盘</div>
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