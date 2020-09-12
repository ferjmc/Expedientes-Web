import request from '@/utils/request'

const API_BASE_URL = 'http://localhost:8080/api'

export function getCerrados(query) {
  return request({
    url: '/cerrados/list',
    method: 'get',
    params: query,
    baseURL: API_BASE_URL
  })
}

export function postReabrir(data) {
  return request({
    url: '/cerrados/reabrir',
    method: 'post',
    data,
    baseURL: API_BASE_URL
  })
}
