import request from '@/utils/request'

const API_BASE_URL = 'http://localhost:8080/api'

export function getCaratulas(query) {
  return request({
    url: '/caratula/list',
    method: 'get',
    params: query,
    baseURL: API_BASE_URL
  })
}

export function getPdfCaratula(data) {
  return request({
    url: '/caratula/pdf',
    method: 'post',
    data,
    responseType: 'arraybuffer',
    baseURL: API_BASE_URL
  })
}

export function caratulasUpdate(data) {
  return request({
    url: '/caratula/crear',
    method: 'post',
    data,
    baseURL: API_BASE_URL
  })
}

export function postCerrar(data) {
  return request({
    url: '/caratula/cerrar',
    method: 'post',
    data,
    baseURL: API_BASE_URL
  })
}

