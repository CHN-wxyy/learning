import React, { useContext, useRef, useState } from 'react';
import { Context } from '../App';
import { Table, Row, Col, Button, Modal, Typography, Input, Form } from 'antd';
import { ADD_PASSWORD, SAVE_PASSWORD, DELETE_PASSWORD } from '../actions/action';
import uuid from 'uuid';
import FileSaver from 'file-saver';
import { Decrypto, Encrypto } from '../utils/crypto-op';
const { Link, Paragraph } = Typography;

const PasswordManage = () => {

  const initialValues = { key: '', webName: '', name: '', pwd: '' };
  const [visible, setVisible] = useState(false);
  const [opType, setOpType] = useState();
  const { state, dispatch } = useContext(Context);
  const [form] = Form.useForm();
  const formRef = useRef();
  const FormLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 24 },
  }

  const columns = [
    {
      dataIndex: 'webName',
      title: 'Web Name',
      width: 200,
      align: 'center'
    },
    {
      dataIndex: 'name',
      title: 'Account',
      width: 200,
      align: 'center',
      render: account => <Paragraph copyable={{ tooltips: false }}>{account}</Paragraph>
    },
    {
      dataIndex: 'pwd',
      title: 'Password',
      width: 200,
      align: 'center',
      render: pwd => <Paragraph copyable={{ tooltips: false, text: Decrypto(pwd) }}>{pwd}</Paragraph>
    },
    {
      title: 'Operation',
      width: 100,
      align: 'center',
      render: row => <div>
        <Link onClick={() => editPassword(row)}>Edit</Link>
        <span style={{ margin: '0px 5px' }}>|</span>
        <Link onClick={() => deletePassword(row.key)}>Delete</Link>
      </div>
    }
  ];

  const addPassword = () => {
    form.validateFields().then(() => {
      let data = formRef.current.getFieldsValue();
      if (data.key) {
        dispatch({ type: SAVE_PASSWORD, password: data })
      } else {
        data.key = uuid();
        data.pwd = Encrypto(data.pwd);
        dispatch({ type: ADD_PASSWORD, password: data });
      }
      form.setFieldsValue(initialValues);
      setVisible(false);
    }).catch(err => err);
  }

  const generateFile = () => {
    FileSaver.saveAs(new Blob([JSON.stringify(state.passwordList)]), 'data-source.json');
  }

  const editPassword = row => {
    form.setFieldsValue(row);
    setOpType('Edit');
    setVisible(true);
  }

  const deletePassword = key => {
    dispatch({ type: DELETE_PASSWORD, key: key });
  }

  return (<div>
    <Row style={{ marginBottom: '20px' }}>
      <Col offset={4}>
        <Button type="primary" onClick={() => { setVisible(true); setOpType('Add') }}>Add Password</Button>
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
      title={opType + " Password"}
      onOk={addPassword}
      width="400px"
    >
      <Form {...FormLayout} form={form} ref={formRef}>
        <Form.Item name="key" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="webName" label="Web Name" rules={[{ required: true, message: `Please input this password's Web Name` }]}>
          <Input />
        </Form.Item>
        <Form.Item name="name" label="Account" rules={[{ required: true, message: `Please input this password's Account` }]}>
          <Input />
        </Form.Item>
        <Form.Item name="pwd" label="Password" rules={[{ required: true, message: `Please input this password's Password` }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  </div >)
}

export default PasswordManage;