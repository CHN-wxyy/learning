export const REQUEST_GOODSLIST = 'REQUEST_GOODSLIST';
export const RECEIVE_GOODSLIST = 'RECEIVE_GOODSlIST';

export const requestGoodsList = () => ({ type: REQUEST_GOODSLIST });

export const receiveGoodsList = json => ({
  type: RECEIVE_GOODSLIST,
  goodsList: json.goodsList,
  receivedAt: Date.now()
});
