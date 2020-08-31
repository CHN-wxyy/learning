import { ADD_PASSWORD, SAVE_PASSWORD, DELETE_PASSWORD, QUERY_PASSWORDLIST, QUERY_PASSWORDlIST_WITH_WEBNAME } from '../actions/action';

export const Reducer = (state, action) => {
  switch (action.type) {
    case QUERY_PASSWORDLIST || QUERY_PASSWORDlIST_WITH_WEBNAME:
      return { ...state, passwordList: action.passwordList }
    case ADD_PASSWORD:
      return { ...state, passwordList: state.passwordList.concat(action.password) }
    case SAVE_PASSWORD:
      let password = action.password;
      let passwordList_save = state.passwordList.map(o => { if (o.key === password.key) o = { ...o, ...password }; return o; });
      return { ...state, passwordList: passwordList_save };
    case DELETE_PASSWORD:
      return { ...state, passwordList: state.passwordList.filter(o => o.key !== action.key) }
    default:
      return state;
  }
}