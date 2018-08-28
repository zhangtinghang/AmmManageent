import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle() {
  return request({
    url: '/article/detail',
    method: 'get'
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}
export function changeStatus(user, token, _id, status) {
  return request({
    url: '/encrypt/portfolioModify',
    method: 'post',
    data: {
      user,
      token,
      _id,
      status
    }
  })
}

export function delPortfolio(user, token, _id) {
  return request({
    url: '/encrypt/portolioRemove',
    method: 'post',
    data: {
      user,
      token,
      _id
    }
  })
}
