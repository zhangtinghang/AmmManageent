import request from '@/utils/request'

export function loginByUsername(number, password) {
  return request({
    url: '/public/login',
    method: 'post',
    data: {
      number,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function register(username, number, password, operator) {
  return request({
    url: '/public/register',
    method: 'post',
    data: {
      username,
      number,
      password,
      operator
    }
  })
}

export function getUserInfo(token) {
  return request({
    url: '/encrypt/getUserInfo',
    method: 'get',
    params: { token }
  })
}

