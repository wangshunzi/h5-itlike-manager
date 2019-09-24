import React, {Component} from "react"
import {Modal, Form, Input, Select, message} from "antd";
import {addMenu, getMenuListWithParentID} from "../../api/menu-api";

const {Item} = Form;
const {Option} = Select;

class AddMenu extends Component {

    state = {
        menuList: []
    }

    handleOk = e => {
        console.log(e);

        this.props.form.validateFields((error, values) => {
            if (!error) {
                console.log("收集的表单数据", values);
                const {title, _key, icon, parentID} = values
                addMenu(title,_key, icon, parentID).then(result=>{
                    if (result.status === 0) {
                        message.success(result.msg)
                        window.location.reload()
                        this.props.hideFunc()
                    } else {
                        message.success("添加菜单失败")
                    }
                })

            }
        })


        //
    };

    handleCancel = e => {
        console.log(e);
        this.props.hideFunc()
    };


    componentDidMount() {
        getMenuListWithParentID().then(result => {
            if (result.status === 0) {
                this.setState({
                    menuList: result.data.map(item => {
                        return {id: item.id, title: item.title}
                    })
                })
            }
        })
    }

    render() {

        const {getFieldDecorator} = this.props.form

        return (
            <Modal
                title="新增"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText={"确认"}
                cancelText={"取消"}
            >

                <Form>
                    <Item>
                        {getFieldDecorator("parentID", {
                            rules: [
                                {required: true, message: "此项必须填写"}
                            ],
                            initialValue: 0
                        })(
                            <Select>
                                <Option value={0} key={0}>一级菜单</Option>
                                {this.state.menuList.map(item => {
                                   return <Option value={item.id} key={item.id}>{item.title}</Option>
                                })}
                            </Select>
                        )}
                    </Item>

                    <Item>
                        {getFieldDecorator("title", {
                            rules: [
                                {required: true, message: "此项必须填写"}
                            ],
                        })(
                            <Input type={"text"} placeholder={"请输入菜单的名称"}/>
                        )}
                    </Item>
                    <Item>
                        {getFieldDecorator("_key", {
                            rules: [
                                {required: true, message: "此项必须填写"}
                            ],
                        })(
                        <Input type={"text"} placeholder={"请输入菜单的路由"}/>
                        )}
                    </Item>
                    <Item>
                        {getFieldDecorator("icon", {
                            rules: [
                                {required: true, message: "此项必须填写"}
                            ],
                        })(
                            <Input type={"text"} placeholder={"请输入菜单的图标"}/>
                        )}
                    </Item>
                </Form>

            </Modal>
        )
    }
}

export default Form.create()(AddMenu)
