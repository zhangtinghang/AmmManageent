import request from '@/utils/request'

export function getList(id, preNum, nextNum, limit, token) {
  return request({
    url: '/encrypt/blog',
    method: 'get',
    params: { id, preNum, nextNum, limit, token }
  })
}
export function addBlog(user, token, form) {
  return request({
    url: '/encrypt/blog',
    method: 'post',
    data: {
      user,
      token,
      title: form.title,
      intro: form.intro,
      category: form.category,
      blog: form.blog,
      isOpen: form.isOpen
    }
  })
}

export function changeStatus(user, token, _id, status) {
  return request({
    url: '/encrypt/blogModify',
    method: 'post',
    data: {
      user,
      token,
      _id,
      status
    }
  })
}
export function delBlog(user, token, _id) {
  return request({
    url: '/encrypt/blogRemove',
    method: 'post',
    data: {
      user,
      token,
      _id
    }
  })
}
