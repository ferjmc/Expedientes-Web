import request from '@/utils/request'

const API_BASE_URL = 'http://localhost:8080/api'

export function getDerivados(query) {
  return request({
    url: '/derivados/list',
    method: 'get',
    params: query,
    baseURL: API_BASE_URL
  })
}

export function getPdfCaratula(data) {
  return request({
    url: '/derivados/pdf',
    method: 'post',
    data,
    responseType: 'arraybuffer',
    baseURL: API_BASE_URL
  })
}

export function postRecibir(data) {
  return request({
    url: '/derivados/recibir',
    method: 'post',
    data,
    baseURL: API_BASE_URL
  })
}

export function postRechazar(data) {
  return request({
    url: '/derivados/rechazar',
    method: 'post',
    data,
    baseURL: API_BASE_URL
  })
}

