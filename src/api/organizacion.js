/* eslint-disable indent */
import request from '@/utils/request'

const API_BASE_URL = 'http://localhost:8080/api'

export function fetchList() {
    return request({
        url: '/org/list',
        method: 'get',
        baseURL: API_BASE_URL
    })
}

export function getOpt() {
    return request({
        url: '/org/options',
        method: 'get',
        baseURL: API_BASE_URL
    })
}

export function getOrg(id) {
    return request({
        url: '/org/' + id,
        method: 'get',
        baseURL: API_BASE_URL
    })
}

export function setOrg(data) {
    return request({
        url: '/org/crear',
        method: 'post',
        data,
        baseURL: API_BASE_URL
    })
}

