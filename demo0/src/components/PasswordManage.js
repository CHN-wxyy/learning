import React, { useContext, useRef, useState } from 'react';
import { Context } from '../App';
import { Table, Row, Col, Button, Modal, Typography, Input, Form } from 'antd';
import { ADD_PASSWORD } from '../actions/action';
import uuid from 'uuid';
import FileSaver from 'file-saver';
const { Link } = Typography;

const PasswordManage = () => {

  const [visible, setVisible] = useState(false);
  const [opType, setOpType] = useState();
  const { state, dispatch } = useContext(Context);
  const [form] = Form.useForm();
  const formRef = useRef();
  const FormLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  }

  const columns = [
    {
      dataIndex: 'webName',
      title: '网站别名',
      width: 200,
      align: 'center'
    },
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
    },
    {
      title: '操作',
      width: 200,
      align: 'center',
      render: row => <div>
        <Link>复制密码</Link>
        <span style={{ margin: '0px 5px' }}>|</span>
        <Link href="#">编辑</Link>
        <span style={{ margin: '0px 5px' }}>|</span>
        <Link href="#">删除</Link>
      </div>
    }
  ];

  const addPassword = () => {
    let data = formRef.current.getFieldsValue();
    data.key = uuid();
    dispatch({ type: ADD_PASSWORD, password: data });
    setVisible(false);
  }

  const generateFile = () => {
    FileSaver.saveAs(new Blob([JSON.stringify(state.passwordList)]), 'data-source1.json', 'D://data-source1.json');
  }

  return (<div>
    <Row style={{ marginBottom: '20px' }}>
      <Col offset={4}>
        <Button type="primary" onClick={() => { setVisible(true); setOpType('add') }}>Add Password</Button>
        <Button style={{ marginLeft: '20px' }} type="primary" onClick={() => generateFile()}>Generate File</Button>
      </Col>
    </Row>
    <Row>
      <Col offset={4} span={16}>
        <Table
          columns={columns}
          dataSource={state.passwordList}
          pagination={false}
          bordered
        />
      </Col>
    </Row>
    <Modal
      visible={visible}
      onCancel={() => setVisible(false)}
      title={opType + " password"}
      onOk={addPassword}
    >
      <Form {...FormLayout} form={form} ref={formRef}>
        <Form.Item name="webName" label="网站别名">
          <Input />
        </Form.Item>
        <Form.Item name="name" label="账户">
          <Input />
        </Form.Item>
        <Form.Item name="pwd" label="密码">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  </div >)
}

export default PasswordManage;