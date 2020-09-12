/* eslint-disable indent */
import request from '@/utils/request'

const API_BASE_URL = 'http://localhost:8080/api'

export function fetchList(query) {
    return request({
        url: '/oficina/list',
        method: 'get',
        params: query,
        baseURL: API_BASE_URL
    })
}

export function oficinasUpdate(data) {
    return request({
        url: '/oficina/crear',
        method: 'post',
        data,
        baseURL: API_BASE_URL
    })
}
