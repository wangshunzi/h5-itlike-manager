import {ajax} from "./ajax"

import PubSub from 'pubsub-js'


// export const getMenuList = () => {
//     return ajax("api/menus/list")
// }

export const getMenuList = () => ajax("api/menus/list")

// http://localhost:5000/api/menus/listMenusWithParentID?parentID=0
export const getMenuListWithParentID = (parentID=0) => ajax("api/menus/listMenusWithParentID", {
    parentID
})

// http://localhost:5000/api/menus/addMenu
export const addMenu = (title, _key, icon, parentID) => {
    return ajax("api/menus/addMenu", {
        title,
        _key,
        icon,
        parentID
    }, "post")
}

export const deleteMenu = (id) => ajax("api/menus/deleteMenu", {
    id
}, "post")



const MenuKey = "MenuKey"
export const publishMenu = (data) => {
    PubSub.publish(MenuKey, data)
}

export const subMenu = (cb) => {
    PubSub.subscribe(MenuKey, cb);
}
