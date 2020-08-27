import { RECEIVE_GOODSLIST, REQUEST_GOODSLIST, ADD_PASSWORD, SAVE_PASSWORD, DELETE_PASSWORD } from '../actions/action';

export const Reducer = (state, action) => {
  switch (action.type) {
    case REQUEST_GOODSLIST:
      return { ...state, payload: { isFetching: true } }
    case RECEIVE_GOODSLIST:
      return { ...state, payload: { isFetching: false, goodsList: state.goodsList.concat(action.goodsList) } }
    case ADD_PASSWORD:
      return { ...state, passwordList: state.passwordList.concat(action.password) }
    case SAVE_PASSWORD:
      let password = action.password;
      let passwordList = state.passwordList.map(o => { if (o.key === password.key) o = { ...o, ...password }; return o; });
      return { ...state, passwordList: passwordList };
    case DELETE_PASSWORD:
      return { ...state, passwordList: state.passwordList.filter(o => o.key !== action.key) }
    default:
      return state
  }
}