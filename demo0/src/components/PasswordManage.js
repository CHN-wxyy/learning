import React, { useContext, useRef, useState, useEffect, useCallback } from 'react';
import { Context } from '../App';
import { Table, Row, Col, Button, Modal, Typography, Input, Form } from 'antd';
import { queryPasswordListAction, savePasswordAction, addPasswordAction, deletePasswordAction } from '../actions/action';
import uuid from 'uuid';
import FileSaver from 'file-saver';
import { Decrypto, Encrypto } from '../utils/crypto-op';
import { getDatasource } from '../api/password';
import styles from '../scss/App.module.scss';
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
      align: 'center',
      className: styles['webName']
    },
    {
      dataIndex: 'name',
      title: 'Account',
      width: 200,
      align: 'center',
      className: styles['name'],
      render: account => <Paragraph copyable={{ tooltips: false }}>{account}</Paragraph>
    },
    {
      dataIndex: 'pwd',
      title: 'Password',
      align: 'center',
      className: styles['pwd'],
      render: pwd => <Paragraph copyable={{ tooltips: false, text: Decrypto(pwd) }}>{pwd}</Paragraph>
    },
    {
      title: 'Operation',
      width: 100,
      align: 'center',
      className: styles['operation'],
      render: row => <div>
        <Link onClick={() => editPassword(row)}>Edit</Link>
        <span className={styles['delimiter']}>|</span>
        <Link onClick={() => deletePassword(row.key)}>Delete</Link>
      </div>
    }
  ];

  const queryPasswordList = useCallback(passwordList => {
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
        data.pwd = Encrypto(data.pwd);
        dispatch(savePasswordAction(data));
      } else {
        data.key = uuid();
        data.pwd = Encrypto(data.pwd);
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
    dispatch(deletePasswordAction(key));
  }

  useEffect(() => {
    getPasswordList();
  }, [getPasswordList])

  return (<div>
    <Row>
      <div className={styles['features_area']}>
        <Col span={4}></Col>
        <div className={styles['features_left']}>
          <Button type="primary" onClick={() => { setVisible(true); setOpType('Add') }}>Add Password</Button>
          <Button className={styles['generate_file_btn']} type="primary" onClick={() => generateFile()}>Generate File</Button>
        </div>
        <div className={styles['features_right']}>
          <Search className={styles['search_btn']} placeholder="Input Web Name" enterButton="Search" onSearch={webName => getPasswordList(webName)} />
        </div>
        <Col lg={0} xl={4}></Col>
      </div>
    </Row>
    <Row>
      <Col offset={4} span={16}>
        <Table
          columns={columns}
          dataSource={state.passwordList}
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