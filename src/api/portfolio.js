import request from '@/utils/request'

export function addPortfolio(user, token, form) {
  return request({
    url: '/encrypt/portfolio',
    method: 'post',
    data: {
      user,
      token,
      title: form.title,
      intro: form.intro,
      cover: form.cover,
      category: form.category,
      team_name: form.team_name,
      content: form.content,
      links: form.links,
      technology: form.technology,
      testimonial: form.Testimonial
    }
  })
}
export function getPortfolio(id, preNum, nextNum, limit, token) {
  return request({
    url: '/encrypt/portfolio',
    method: 'get',
    params: { id, preNum, nextNum, limit, token }
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

