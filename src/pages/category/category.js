import React, {Component} from "react"
import {Card, Breadcrumb, Button, Table, Icon, Divider,Modal, message} from "antd"
import {deleteMenu, getMenuListWithParentID} from "../../api/menu-api";
import AddMenu from "./add-menu"
import EditMenu from "./edit-menu"

export default class Category extends Component {

    state = {
        showNum: 0, // 0 全部隐藏, 1, 显示添加面板, 2, 编辑面板
        currentParentMenu: {}, // 记录当前的父菜单
        dataSource: []
    }


    _hideAddPane = ()=> {
        this.setState({
            showNum: 0
        })
    }


    columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: "center",
        },
        {
            title: '菜单名称',
            dataIndex: 'title',
            key: 'title',
            align: "center",
        },
        {
            title: '菜单路由',
            dataIndex: '_key',
            key: 'address',
            align: "center",
        },
        {
            title: '菜单图标',
            dataIndex: 'icon',
            key: 'icon',
            align: "center",
            render: (text, record, index) => {
                return (
                    <span>
                        <Icon type={record.icon} /> = {record.icon}
                    </span>
                )
            }
        },
        {
            title: '操作',
            key: 'action',
            align: "center",
            width: 300,
            render: (text, record, index) => {

                return (
                    <span>
                        {
                            (this.state.currentParentMenu.id === undefined) ? (
                                <span>
                                    <Button onClick={() => this._showSubMenu(record)}>查看子菜单</Button>
                                    <Divider type="vertical" />
                                </span>
                            ) : ""
                        }

                        <Button onClick={() => this._editMenu(record)}>编辑</Button>
                        <Divider type="vertical" />
                        <Button onClick={() => this._deleteMenu(record)}>删除</Button>
                    </span>
                )
            }
        },
    ]


    _addMenu = () => {
        console.log("增加一个新的菜单");
        this.setState({
            showNum: 1
        })
    }
    _editMenu = (menu) => {
        console.log("需要编辑的菜单", menu);
        this.setState({
            showNum: 2
        })
    }
    _deleteMenu = (menu) => {
        console.log("需要删除的菜单", menu);
        Modal.confirm({
            title: '确认是否删除',
            content: '删除此菜单, 也会删除所有的子菜单, 以及对应的题目?',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                deleteMenu(menu.id).then(result => {
                    if (result.status === 0) {
                        message.success("删除成功")
                        window.location.reload()
                    } else {
                        message.error("删除失败")
                    }
                })
            }
        });

    }

    _showSubMenu = (parentMenu) => {
        console.log("查看子菜单", parentMenu);

        this.setState({
            currentParentMenu: parentMenu
        })
        this._showMenusWithParentID(parentMenu.id)
    }

    // 根据一个parentID, 发送网络请求, 获取对应的菜单列表数据,
    // 自动的更新到state里面
    _showMenusWithParentID = (parentID=0) => {
        if (parentID === 0)  {
            console.log("清空当前的父菜单");
            this.setState({
               currentParentMenu: {}
           })
        }

        getMenuListWithParentID(parentID).then(result => {
            console.log("从服务器获取到的菜单列表数据", result);
            if (result.status === 0) {
                this.setState({
                    dataSource: result.data
                })
            }
        })
    }

    componentDidMount() {
        this._showMenusWithParentID()
    }


    render() {

        let title = (
            <Breadcrumb>
                <Breadcrumb.Item onClick={() => this._showMenusWithParentID(0) } style={{cursor: "pointer"}}>一级菜单</Breadcrumb.Item>
                {this.state.currentParentMenu.title ? <Breadcrumb.Item>{this.state.currentParentMenu.title}</Breadcrumb.Item> : ""}
            </Breadcrumb>
        )

        let rightBtn = (
            <Button type={"primary"} onClick={this._addMenu}>添加</Button>
        )

        return (
            <Card title={title} extra={rightBtn}>
                <Table
                    dataSource={this.state.dataSource}
                    columns={this.columns}
                    bordered
                    rowKey={"id"}
                    pagination={{
                        defaultPageSize: 3,
                        showQuickJumper: true
                    }}
                />

                <AddMenu visible={this.state.showNum === 1} hideFunc={this._hideAddPane}/>
                <EditMenu visible={this.state.showNum === 2} hideFunc={this._hideAddPane}/>
            </Card>
        )
    }
}
