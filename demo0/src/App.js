import React, { useReducer } from 'react'
import { initialValues, reducer } from './reducers/password'
import FileSaver from 'file-saver'
import dataSource from './json/my-password.json'
import { Table, Row, Col, Button, Modal } from 'antd'
import 'antd/dist/antd.css'
// import { changeVisible } from './actions/password'

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialValues);
  const { visible } = state;
  console.log(visible)
  const columns = [
    {
      title: 'account',
      dataIndex: 'name',
      width: 100,
      align: 'center'
    },
    {
      title: 'password',
      dataIndex: 'password',
      width: 100,
      align: 'center'
    }
  ]
  // const login = e => {
  //   e.preventDefault();
  //   dispatch({ type: 'login', data: { name: 'wxyy', role: 'super' } });
  // }

  const generatePasswordFile = () => {
    let blob = new Blob([{}], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, "my-password.json");
  }

  return (
    <div className="App">
      {/* <button onClick={generatePasswordFile}>生成密码文件</button> */}
      <Row>
        <Col span={12} offset={6}><Button type="primary" onClick={() => {}}>Add Account & Password</Button></Col>
        <Col span={12} offset={6}>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            bordered
          />
        </Col>
      </Row>
      <Modal
        visible={visible}
        onCancel={() => {}}
      >
        asdfasdfasd
      </Modal>
    </div>
  );
}

export default App;
