import request from '@/utils/request'

export function changeStatus(user, token, _id, status) {
  return request({
    url: '/encrypt/changeAccStatus',
    method: 'post',
    data: {
      user,
      token,
      _id,
      status
    }
  })
}

export function updateAccount(user, token, _id, dataObj) {
  console.log('jaingad====', dataObj)
  return request({
    url: '/encrypt/updateAccount',
    method: 'post',
    data: {
      user,
      token,
      _id,
      dataObj
    }
  })
}

export function delAccount(user, token, _id) {
  return request({
    url: '/encrypt/delAccount',
    method: 'post',
    data: {
      user,
      token,
      _id
    }
  })
}

export function getUserList(id, preNum, nextNum, limit, token) {
  return request({
    url: '/encrypt/getUserList',
    method: 'get',
    params: { id, preNum, nextNum, limit, token }
  })
}
