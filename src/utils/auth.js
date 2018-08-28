import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setAuth(auth) {
  const state = auth || {}
  return localStorage.setItem('$state_admin', JSON.stringify(state))
}

export function getAuth() {
  const stateText = localStorage.getItem('$state_admin') || '{}'
  return JSON.parse(stateText)
}

export function removeAuth() {
  return localStorage.localStorage.removeItem('$state_admin')
}
