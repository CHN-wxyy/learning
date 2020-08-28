import request from '../utils/request';

export const getDatasource = () => {
  return request({
    url: 'getDatasource/getData',
    method: 'get'
  })
}