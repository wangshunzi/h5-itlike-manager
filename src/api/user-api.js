import {ajax} from "./ajax";

import {saveObj, removeObj, getObj} from "../tools/cache-tool"

const USERKEY = "USERKEY"

export const checkLogin = (account, password) => {
    return  ajax("api/users/login", {
        account,
        password
    }, "post")
}


export const updateUser = (id, account, password, userName, headerImg)=> {
    return ajax("api/users/update", {
        id,
        account,
        password,
        userName,
        headerImg
    }, "post")
}


export const saveUser = (userObj) => {
    // localStorage.setItem(USERKEY, JSON.stringify(userObj))
    saveObj(USERKEY, userObj)
}

export const loginOut = () => {
    // localStorage.removeItem(USERKEY)
    removeObj(USERKEY)
}

export const getUser = () => {
    return getObj(USERKEY)
}

export const isLogin = () => {
    // let user = JSON.parse(localStorage.getItem(USERKEY) || "{}")
    let user = getObj(USERKEY)
    if (user.id) {
        return true
    }
    return false
}
