const columns = () => {
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
      key: 'type',
      title: '数据源类型',
      dataIndex: 'type',
    },
    {
      key: 'size',
      title: '容量',
      dataIndex: 'size',
    },
    {
      key: 'description',
      title: '描述',
      dataIndex: 'description',
    },
    {
      key: 'create_at',
      title: '创建时间',
      dataIndex: 'create_at',
    },
    {
      key: 'update_at',
      title: '修改时间',
      dataIndex: 'update_at',
    },
    {
      key: 'operator',
      title: '操作',
      render(text, record) {
        return (
          <a onClick={() => {}}>删除</a>
        )
      }
    }
  ]
}

export default columns