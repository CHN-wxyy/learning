import { RECEIVE_GOODSLIST, REQUEST_GOODSLIST, ADD_PASSWORD } from '../actions/action';

export const Reducer = (state, action) => {
  switch (action.type) {
    case REQUEST_GOODSLIST:
      return { ...state, payload: { isFetching: true } }
    case RECEIVE_GOODSLIST:
      return { ...state, payload: { isFetching: false, goodsList: state.goodsList.concat(action.goodsList) } }
    case ADD_PASSWORD:
      return { ...state, passwordList: state.passwordList.concat(action.password) }
    default:
      return state
  }
}