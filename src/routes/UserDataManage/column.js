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
      key: 'mobile',
      dataIndex: 'mobile',
    },
    {
      title: '是否管理员',
      key: 'is_admin',
      dataIndex: 'is_admin',
      render(text, record) {
        return text === 1 ? '是' : '否'
      }
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
            <div style={{
              display: 'inline-block',
              width: 0,
              height: '14px',
              margin: '0 5px',
              marginBottom: '-3px',
              border: '0.5px solid #aaa'
            }} />
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
