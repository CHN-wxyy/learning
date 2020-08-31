import request from '../utils/request';

export const getDatasource = webName => {
  return request({
    url: `getDatasource/getData?webName=${webName}`,
    method: 'get'
  })
}