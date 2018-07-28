import React from 'react';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
import Spin from 'antd/lib/spin'
import Icon from 'antd/lib/icon'
import 'antd/lib/icon/style/css'
import 'antd/lib/spin/style/css'
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import _ from 'lodash'
import columns from './column';
import styles from './index.less'

const DashBoard = ({ dispatch, dashBoard }) => {
  const { dashBoardList, pageInfo, currentViewUser, total, loading } = dashBoard
  const toUserList = () => {
    dispatch(routerRedux.push('/'))
  }
  return (
    <div className={styles.container}>
      <Spin spinning={loading > 0}>
        <div className={styles.goback}>
            <button onClick={toUserList}><Icon type="left" />返回用户列表</button>
          </div>
          <div className={styles.content}>
            <div className={styles.title}>{`${_.get(currentViewUser, 'name')}的仪表盘`}</div>
            <Table
              columns={columns(dispatch)}
              dataSource={dashBoardList}
              pagination={{
                current: _.get(pageInfo, 'page', 1),
                pageSize: _.get(pageInfo, 'pageSize', 20),
                onChange: (page, pageSize) => {
                  dispatch({ type: 'dashBoard/setPageInfo', payload: { page, pageSize } });
                  dispatch({ type: 'dashBoard/fetchDashBoardList' })
                },
                total
              }}
              locale={{
                emptyText: '当前数据为空'
              }}
            />
          </div>
      </Spin>
    </div>
  )
}

const mapStateToProps = ({ dashBoard }) => ({
  dashBoard
})

export default connect(mapStateToProps)(DashBoard);