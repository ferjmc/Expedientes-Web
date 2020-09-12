import request from '@/utils/request'

const API_BASE_URL = 'http://localhost:8080/api'

export function getPases(query) {
  return request({
    url: '/pase/list',
    method: 'get',
    params: query,
    baseURL: API_BASE_URL
  })
}

export function postDerivar(data) {
  return request({
    url: '/pase/derivar',
    method: 'post',
    data,
    baseURL: API_BASE_URL
  })
}
