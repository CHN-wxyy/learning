import React, { useContext, useRef, useState, useEffect, useCallback } from 'react';
import { Context } from '../App';
import { Table, Row, Col, Button, Modal, Typography, Input, Form } from 'antd';
import { queryPasswordListAction, savePasswordAction, addPasswordAction, deletePasswordAction } from '../actions/action';
import uuid from 'uuid';
import FileSaver from 'file-saver';
import { Decrypto, Encrypto } from '../utils/crypto-op';
import { getDatasource } from '../api/password';
// import datasource from '../test/data-source.json';
const { Link, Paragraph } = Typography;
const { Search } = Input;

const PasswordManage = () => {

  const initialValues = { key: '', webName: '', name: '', pwd: '' };
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const queryPasswordList = useCallback(passwordList => {
    // dispatch({ type: QUERY_PASSWORDLIST, passwordList: passwordList })
    dispatch(queryPasswordListAction(passwordList));
  }, [dispatch])

  const getPasswordList = useCallback((webName = '') => {
    setLoading(true);
    getDatasource(webName).then(res => {
      queryPasswordList(res.data);
      setLoading(false);
    })
  }, [queryPasswordList])

  const addPassword = () => {
    form.validateFields().then(() => {
      let data = formRef.current.getFieldsValue();
      if (data.key) {
        // dispatch({ type: SAVE_PASSWORD, password: data })
        dispatch(savePasswordAction(data));
      } else {
        data.key = uuid();
        data.pwd = Encrypto(data.pwd);
        // dispatch({ type: ADD_PASSWORD, password: data });
        dispatch(addPasswordAction(data));
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
    console.log(state);
  }

  const deletePassword = key => {
    // dispatch({ type: DELETE_PASSWORD, key: key });
    dispatch(deletePasswordAction(key));
  }

  useEffect(() => {
    getPasswordList();
    // queryPasswordList(datasource);
  }, [getPasswordList])

  return (<div>
    <Row style={{ marginBottom: '20px' }}>
      <Col offset={4} span={16} style={{ marginBottom: 0, height: 60, display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '50%' }}>
          <Button type="primary" onClick={() => { setVisible(true); setOpType('Add') }}>Add Password</Button>
          <Button style={{ marginLeft: '20px' }} type="primary" onClick={() => generateFile()}>Generate File</Button>
        </div>
        <div style={{ width: '50%' }}>
          <Search
            placeholder="Input Web Name"
            enterButton="Search"
            onSearch={webName => getPasswordList(webName)}
          />
        </div>
      </Col>
    </Row>
    <Row>
      <Col offset={4} span={16}>
        <Table
          columns={columns}
          dataSource={state.passwordList}
          // dataSource={datasource}
          pagination={false}
          loading={loading}
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