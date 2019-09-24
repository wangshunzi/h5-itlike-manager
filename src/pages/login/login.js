import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import { Form, Icon, Input, Button, message } from 'antd';
import "./login.less"
import xl from "./images/xiaoliao.png"

import {checkLogin, saveUser, isLogin} from "../../api/user-api"


const {Item} = Form;

class Login extends Component {


    // 表单提交时, 执行的方法
    _handlerSubmit = (e) => {
        e.preventDefault()
        // console.log("提交了表单");
        this.props.form.validateFields((error, values) => {
            if (!error) {
                console.log("接收到了没有问题的数据", values);

                const {account, password} = values;
                // 1. 发送网络请求, 验证账号和密码是否正确
                // http://localhost:5000/api/users/login
                // POST
                // account  password
                checkLogin(account, password).then(result=>{
                    if (result.status === 0) {
                        // 2. 持久化, 用户的登录信息
                        saveUser(result.data[0])
                        // 登录成功之后, 需要做的事情
                        message.success("登录成功!")
                        // 1. 跳转到后台管理界面的首页
                        this.props.history.replace("/")




                    }else {
                        message.error(result.msg)
                    }
                })
            }
        })
    }


    render() {

        if (isLogin()) {
            return <Redirect to={"/"}/>
        }

        const {getFieldDecorator} = this.props.form;
        return (
            <div className="loginBack">
                <div className="loginPane">
                    <div className="top">
                        <img src={xl} alt=""/>
                        <span>撩课-后台管理系统</span>
                    </div>
                    <div className="form">
                        <Form onSubmit={this._handlerSubmit}>
                            <Item>

                                {getFieldDecorator("account", {
                                    // 配置对象(key, 固定, 代表不同的含义)
                                    rules: [
                                        {required:true, message: "请务必填写账号"}
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="请输入账号"
                                    />
                                )}
                            </Item>
                            <Item>
                                {getFieldDecorator("password", {
                                    // 配置对象(key, 固定, 代表不同的含义)
                                    rules: [
                                        {required:true, message: "请务必填写密码"},
                                        {min:5, message: "密码最少是5个字符"}
                                    ]
                                })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="请输入密码"/>
                                )}
                            </Item>
                            <Item>
                                <Button type="primary" htmlType="submit" className="loginBtn">
                                    登录
                                </Button>
                            </Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form.create()(Login)
