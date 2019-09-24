import React, {Component} from "react"
import {Form, Input, Button, message } from "antd";
import {getUser, updateUser, saveUser} from "../../api/user-api"
import UploadHeader from "./upload-header"

const {Item} = Form;
class User extends Component {

    constructor(props) {
        super(props);
        // 1. 创建一个引用容器
        this.uploadImg = React.createRef();
    }

    formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
    };
    tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    _handlerSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((error, values) => {
            if (!error) {
                console.log(values, "最终的有效数据");

                const {id, account, password, userName} = values
                // 头像数据
                let headerImg = this.uploadImg.current._getHeaderImageName()
                updateUser(id, account, password, userName, headerImg).then(result=> {
                    console.log("数据更新结果", result);
                    if (result.status === 0) {
                        let newUser = result.data[0]
                        saveUser(newUser)
                        message.success("用户信息更新成功")
                    }
                })
            }
        })
    }

    render() {

        let user = getUser()
        // console.log(user);


        const {getFieldDecorator} = this.props.form;

        return (
            <Form {...this.formItemLayout} onSubmit={this._handlerSubmit}>
                <Item>
                    {getFieldDecorator("id", {
                        initialValue: user.id
                    })(
                        <Input type={"hidden"}/>
                    )}
                </Item>
                <Item label={"账号"}>
                    {getFieldDecorator("account", {
                        initialValue: user.account
                    })(
                        <Input type="text" placeholder={"请输入账号"} readOnly={true} disabled={true}/>
                    )}
                </Item>

                <Item label={"密码"}>
                    {getFieldDecorator("password", {
                        initialValue: user.password,
                        rules: [
                            {required: true,message: '必须要输入密码才可以'},
                            {min: 5, message: "密码至少需要输入5个字符"}
                        ]
                    })(
                    <Input type="text" placeholder={"请输入密码"}/>
                    )}
                </Item>

                <Item label={"真实姓名"}>
                    {getFieldDecorator("userName", {
                        initialValue: user.userName,
                    })(
                    <Input type="text" placeholder={"请输入真实姓名"}/>
                    )}
                </Item>


                <Item label={"头像"}>
                    <UploadHeader ref={this.uploadImg} headerImg={user.headerImg}/>
                </Item>
                <Item {...this.tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        保存
                    </Button>
                </Item>
            </Form>
        )
    }
}

export default Form.create()(User)
