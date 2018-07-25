import { routerRedux } from 'dva/router';
const columns = (dispatch) => {
  return [
    {
      title: '用户ID',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: '姓名',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: '电话',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: '是否管理员',
      key: 'is_admin',
      dataIndex: 'is_admin',
    },
    {
      title: '操作',
      key: 'operator',
      render(text, record) {
        const { id } = record
        return (
          <div>
            <a onClick={() => {
              dispatch(routerRedux.push(`/dashBoard/${id}`))
            }}>
              仪表盘
            </a>
            <a onClick={() => {
              dispatch(routerRedux.push(`/dataSource/${id}`))
            }}>
              数据源
            </a>
          </div>
        )
      }
    }
  ]
}

export default columns;
