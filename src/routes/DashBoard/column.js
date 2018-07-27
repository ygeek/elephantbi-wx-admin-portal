import moment from 'moment'
const columns = (dispatch) => {
  return [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
    },
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
        return moment(text).format('YYYY-MM-DD')
      }
    },
    {
      title: '修改时间',
      key: 'updated_at',
      dataIndex: 'updated_at',
      render(text, record) {
        return moment(text).format('YYYY-MM-DD')
      }
    },
    {
      title: '操作',
      key: 'operator',
      render(text, record) {
        return (
          <a
            onClick={() => {
              dispatch({ type: 'dashBoard/deleteDashBoard', payload: record.id })
            }}>
            删除
        </a>
        )
      }
    }
  ]
}

export default columns;