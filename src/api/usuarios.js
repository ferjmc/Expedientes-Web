/* eslint-disable indent */
import request from '@/utils/request'

const API_BASE_URL = 'http://localhost:8080/api'

export function login(data) {
    return request({
        url: '/auth/signin',
        method: 'post',
        data,
        baseURL: API_BASE_URL
    })
}

export function getInfo(id) {
    return request({
        url: '/user/info',
        method: 'get',
        params: { id },
        baseURL: API_BASE_URL
    })
}

export function getUser(id) {
    return request({
        url: '/user/' + id,
        method: 'get',
        baseURL: API_BASE_URL
    })
}

export function fetchList(query) {
    return request({
        url: '/user/list',
        method: 'get',
        params: query,
        baseURL: API_BASE_URL
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}

export function signup(data) {
    return request({
        url: '/auth/signup',
        method: 'post',
        data,
        baseURL: API_BASE_URL
    })
}

export function validUser(username) {
    return request({
        url: '/user/validUser',
        method: 'get',
        params: { username },
        baseURL: API_BASE_URL
    })
}

export function getSimple() {
    return request({
        url: '/user/simpleList',
        method: 'get',
        baseURL: API_BASE_URL
    })
}
