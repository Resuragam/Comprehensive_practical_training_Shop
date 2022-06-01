import Cookies from 'js-cookie'

const Auto_Token = 'token'

export function setToken(token: string) {
    return Cookies.set(Auto_Token,token)
}

export function getToken() {
    return Cookies.get(Auto_Token)
}

export function removeToken() {
    return Cookies.remove(Auto_Token)
}