import React, { useReducer, createContext } from 'react';
import { Reducer } from './reducers/reducer';
import datasource from './test/data-source1.json';
import PasswordManage from './components/PasswordManage'
import 'antd/dist/antd.css';

export const Context = createContext(null);
const initialValues = { passwordList: datasource, xxxList: { name: 1 } };
const App = () => {
  const [state, dispatch] = useReducer(Reducer, initialValues);
  return (
    <Context.Provider value={{ state, dispatch }}>
      <PasswordManage />
    </Context.Provider>
  )
}

export default App;