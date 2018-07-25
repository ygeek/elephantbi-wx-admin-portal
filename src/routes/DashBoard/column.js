const columns = () => {
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
      key: 'create_at',
      dataIndex: 'create_at',
    },
    {
      title: '修改时间',
      key: 'update_at',
      dataIndex: 'update_at',
    },
    {
      title: '操作',
      key: 'operator',
      render() {
        return (
          <a onClick={() => {}}>删除</a>
        )
      }
    }
  ]
}

export default columns;