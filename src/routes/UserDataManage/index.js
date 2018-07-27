import React from 'react';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
import Spin from 'antd/lib/spin'
import 'antd/lib/spin/style/css'
import { connect } from 'dva';
import _ from 'lodash'
import columns from './column';
import styles from './index.less'

const UserDataManage = ({ dispatch, userDataManagement }) => {
  const { userInfo, pageInfo, total, loading } = userDataManagement
  return (
    <div className={styles.container}>
      <Spin spinning={loading > 0}>
        <div className={styles.title}>用户管理</div>
        <div>
          <Table
            columns={columns(dispatch)}
            dataSource={userInfo}
            pagination={{
              current: _.get(pageInfo, 'page', 1),
              pageSize: _.get(pageInfo, 'pageSize', 20),
              onChange: (page, pageSize) => {
                dispatch({ type: 'userDataManagement/setPageInfo', payload: { page, pageSize } });
                dispatch({ type: 'userDataManagement/fetchUserInfoList' })
              },
              total,
            }}
          />
        </div>
      </Spin>
    </div>
  )
}

const mapStateToProps = ({ userDataManagement }) => ({
  userDataManagement
})

export default connect(mapStateToProps)(UserDataManage);
