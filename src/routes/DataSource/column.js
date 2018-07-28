import moment from 'moment'
import Modal from 'antd/lib/modal'
import 'antd/lib/modal/style/css'
const columns = (dispatch) => {
  return [
    {
      key: 'name',
      title: '名称',
      dataIndex: 'name',
    },
    {
      key: 'source_type',
      title: '数据源类型',
      dataIndex: 'source_type',
      render(text, record) {
        return text === 0 ? 'Csv' : 'Excel' 
      }
    },
    {
      key: 'size',
      title: '容量',
      dataIndex: 'size',
      render(text, record) {
        return `${text}KB`
      }
    },
    {
      key: 'description',
      title: '描述',
      dataIndex: 'description',
    },
    {
      key: 'created_at',
      title: '创建时间',
      dataIndex: 'created_at',
      render(text, record) {
        return moment(text).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      key: 'updated_at',
      title: '修改时间',
      dataIndex: 'updated_at',
      render(text, record) {
        return moment(text).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      key: 'operator',
      title: '操作',
      render(text, record) {
        return (
          <a
          onClick={() => {
            Modal.confirm({
              title: '删除数据源',
              content: '删除数据源，会一起删除所有关联的图表，是否确认',
              onOk() {
                dispatch({ type: 'dataSource/deleteDataSource', payload: record.id })
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

export default columns