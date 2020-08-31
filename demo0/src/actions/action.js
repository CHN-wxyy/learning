export const ADD_PASSWORD = 'ADD_PASSWORD';
export const SAVE_PASSWORD = 'SAVE_PASSWORD';
export const DELETE_PASSWORD = 'DELETE_PASSWORD';
export const QUERY_PASSWORDLIST = 'QUERY_PASSWORDLIST';
export const QUERY_PASSWORDlIST_WITH_WEBNAME = 'QUERY_PASSWORDlIST_WITH_WEBNAME';

export const addPasswordAction = password => ({ type: ADD_PASSWORD, password: password });

export const savePasswordAction = password => ({ type: SAVE_PASSWORD, password: password });

export const deletePasswordAction = key => ({ type: DELETE_PASSWORD, key: key });

export const queryPasswordListAction = passwordList => ({ type: QUERY_PASSWORDLIST, passwordList: passwordList })




