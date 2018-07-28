import moment from 'moment'
import Modal from 'antd/lib/modal'
import 'antd/lib/modal/style/css'
const columns = (dispatch) => {
  return [
    {
      title: '名称',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '创建时间',
      key: 'created_at',
      dataIndex: 'created_at',
      render(text, record) {
        return moment(text).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '修改时间',
      key: 'updated_at',
      dataIndex: 'updated_at',
      render(text, record) {
        return moment(text).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '操作',
      key: 'operator',
      render(text, record) {
        return (
          <a
            onClick={() => {
              Modal.confirm({
                title: '删除仪表盘',
                content: '仪表盘删除后无法恢复，是否确认',
                onOk() {
                  dispatch({ type: 'dashBoard/deleteDashBoard', payload: record.id })
                },
                okText: '确认',
                cancelText: '取消'
              })
              
            }}>
            删除
        </a>
        )
      }
    }
  ]
}

export default columns;