import React, {Component} from "react"
import {Modal} from "antd";
export default class EditMenu extends Component {

    handleOk = e => {
        console.log(e);

        this.props.hideFunc()
    };

    handleCancel = e => {
        console.log(e);
        this.props.hideFunc()
    };


    render() {
        return (
            <Modal
                title="编辑菜单"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText={"确认"}
                cancelText={"取消"}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        )
    }
}
