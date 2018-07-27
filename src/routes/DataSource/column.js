import moment from 'moment'
const columns = (dispatch) => {
  return [
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'id',
    },
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
        return text === 0 ? 'csv' : 'excel' 
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
        return moment(text).format('YYYY-MM-DD')
      }
    },
    {
      key: 'updated_at',
      title: '修改时间',
      dataIndex: 'updated_at',
      render(text, record) {
        return moment(text).format('YYYY-MM-DD')
      }
    },
    {
      key: 'operator',
      title: '操作',
      render(text, record) {
        return (
          <a
          onClick={() => {
            dispatch({ type: 'dataSource/deleteDataSource', payload: record.id })
          }}>
            删除
          </a>
        )
      }
    }
  ]
}

export default columns