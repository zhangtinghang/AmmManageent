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

// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function logout(user, token) {
  return request({
    url: '/encrypt/logOut',
    method: 'post',
    data: {
      user,
      token
    }
  })
}

export function register(username, number, password, operator, type) {
  return request({
    url: '/public/register',
    method: 'post',
    data: {
      username,
      number,
      password,
      operator,
      type
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

