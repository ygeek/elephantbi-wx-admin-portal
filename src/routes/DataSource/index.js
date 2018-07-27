import React from 'react';
import Table from 'antd/lib/table';
import { routerRedux } from 'dva/router';
import 'antd/lib/table/style/css';
import _ from 'lodash'
import { connect } from 'dva';
import columns from './column';
import styles from './index.less'

const DataSource = ({ dispatch, dataSource }) => {
  const toUserList = () => {
    dispatch(routerRedux.push('/'))
  }
  const { dataSourceList, currentViewUser, pageInfo, total } = dataSource
  return (
    <div className={styles.container}>
      <div className={styles.goback}>
        <button onClick={toUserList}>返回用户列表</button>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{`${_.get(currentViewUser, 'name')}的数据源`}</div>
        <Table
          columns={columns(dispatch)}
          dataSource={dataSourceList}
          pagination={{
            current: _.get(pageInfo, 'page', 1),
            pageSize: _.get(pageInfo, 'pageSize', 20),
            onChange: (page, pageSize) => {
              dispatch({ type: 'dataSource/setPageInfo', payload: { page, pageSize } });
              dispatch({ type: 'dataSource/fetchDataSourceList' })
            },
            total
          }}
          scroll={{
            y: 600
          }}
        />
      </div>
    </div>
  )
}

const mapStateToProps = ({ dataSource }) => ({
  dataSource
})

export default connect(mapStateToProps)(DataSource)