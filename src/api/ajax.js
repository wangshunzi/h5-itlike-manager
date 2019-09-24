import axios from "axios"
import {message} from "antd";


const BASEURL = "http://localhost:3000/"

// 功能: 发送网络请求
// 统一处理网络错误
// 接口信息: url, 参数, 请求方式
//
//
export const ajax = (url, data={}, method="get", baseURL=BASEURL) => {

    return new Promise((resolve) => {
        if (method.toLowerCase() === "get") {
            axios.get(baseURL + url, {
                params: data
            }).then(response=>{
                // 1. 网络请求成功
                resolve(response.data)
            }).catch(error=>{
                // 网络请求失败的时候
                message.error("网络异常: " + error.message)
            })


        } else if(method.toLowerCase() === "post") {
            axios.post(baseURL + url, data).then(response=>{
                // 1. 网络请求成功
                resolve(response.data)
            }).catch(error=>{
                // 网络请求失败的时候
                message.error("网络异常: " + error.message)
            })
        }
    })


}
