import store from "store"

export const saveObj = (key, obj) => {
    store.set(key, obj)
}

export const removeObj = (key) => {
    store.remove(key)
}

export const getObj = (key) => {
    return store.get(key) || {}
}
