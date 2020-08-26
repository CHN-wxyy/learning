export const REQUEST_GOODSLIST = 'REQUEST_GOODSLIST';
export const RECEIVE_GOODSLIST = 'RECEIVE_GOODSlIST';
export const ADD_PASSWORD = 'ADD_PASSWORD';

export const requestGoodsList = () => ({ type: REQUEST_GOODSLIST });

export const receiveGoodsList = json => ({
  type: RECEIVE_GOODSLIST,
  goodsList: json.goodsList,
  receivedAt: Date.now()
});

export const addPassword = password => ({
  type: ADD_PASSWORD,
  password: password
})


