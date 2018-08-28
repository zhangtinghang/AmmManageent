import request from '@/utils/request'
export function getList(id, preNum, nextNum, limit, token) {
  return request({
    url: '/encrypt/getNotice',
    method: 'get',
    params: { id, preNum, nextNum, limit, token }
  })
}

export function addNotice(user, token, dataObj){
    return request({
        url: '/encrypt/addNotice',
        method: 'post',
        data: {
          user,
          token,
          dataObj
        }
      })
}

export function changeStatus(user, token, _id, status) {
  return request({
    url: '/encrypt/modnotice',
    method: 'post',
    data: {
      user,
      token,
      _id,
      status
    }
  })
}

export function delNotice(user, token, _id) {
  return request({
    url: '/encrypt/delNotice',
    method: 'post',
    data: {
      user,
      token,
      _id
    }
  })
}

export function modNotice(user, token, dataObj){
  return request({
      url: '/encrypt/updNotice',
      method: 'post',
      data: {
        user,
        token,
        dataObj
      }
    })
}