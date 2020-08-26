import React, { useContext } from 'react';
import { Context } from '../App';
import { Table } from 'antd';

const PasswordManage = () => {

  const { state, dispatch } = useContext(Context);

  const columns = [
    {
      dataIndex: 'name',
      title: '账号',
      width: 200,
      align: 'center'
    },
    {
      dataIndex: 'pwd',
      title: '密码',
      width: 200,
      align: 'center'
    }
  ]

  return (<div>
    <Table
      columns={columns}
      dataSource={state}
      pagination={false}
      bordered
    />
  </div>)
}

export default PasswordManage;