import request from '@/utils/request'
export function getList(id, preNum, nextNum, limit, token) {
  return request({
    url: '/encrypt/getDown',
    method: 'get',
    params: { id, preNum, nextNum, limit, token }
  })
}

export function addDownload(user, token, dataObj) {
  return request({
    url: '/encrypt/addDown',
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
    url: '/encrypt/modDown',
    method: 'post',
    data: {
      user,
      token,
      _id,
      status
    }
  })
}

export function delDownload(user, token, _id) {
  return request({
    url: '/encrypt/delDown',
    method: 'post',
    data: {
      user,
      token,
      _id
    }
  })
}

export function modDownload(user, token, dataObj) {
  return request({
    url: '/encrypt/updDown',
    method: 'post',
    data: {
      user,
      token,
      dataObj
    }
  })
}
