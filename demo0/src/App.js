import React, { useReducer } from 'react';
import { INIT_LOGIN_STATE, R_LOGIN } from './reducers/login'

const App = () => {

  const [state, dispatch] = useReducer(R_LOGIN, INIT_LOGIN_STATE);
  const { isLoading } = state;
  console.log(isLoading);
  const login = e => {
    e.preventDefault();
    dispatch({ type: 'login', data: { name: 'wxyy', role: 'super' } });
  }

  return (
    <div className="App">
      <button onClick={login}>登录</button>
    </div>
  );
}

export default App;
