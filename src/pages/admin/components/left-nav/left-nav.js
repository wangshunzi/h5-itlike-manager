import React, {Component} from "react"
import { Layout, Menu, Icon } from 'antd';
import {Link, withRouter} from "react-router-dom"
import "./left-nav.less"
import PropTypes from "prop-types"
import xl from "./images/xiaoliao.png"
import {getMenuList, publishMenu} from "../../../../api/menu-api";


const { Sider } = Layout;
const {Item, SubMenu} = Menu

class LeftNav extends Component {

    state = {
        menuList:  []
    }

    static propTypes = {
        collapsed: PropTypes.bool
    };


    // 非递归版本
    _renderMenu2 = (menuList) => {
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Item key={item._key}>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </Item>
                )
            } else {
                return (
                    <SubMenu
                        key={item._key}
                        title={
                            <span>
                              <Icon type={item.icon} />
                              <span>{item.title}</span>
                        </span>
                        }
                    >
                        {item.children.map(item => {
                            return (<Item key={item._key}>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </Item>)
                        })}
                    </SubMenu>
                )
            }
        })
    }
    _renderMenu = (menuList) => {
        return menuList.map(item=>{
            if (!item.children) {
                return (
                    <Item key={item._key}>
                        <Link to={item._key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Item>
                )
            }else {
                return (
                    <SubMenu
                        key={item._key}
                        title={
                            <span>
                              <Icon type={item.icon} />
                              <span>{item.title}</span>
                        </span>
                        }
                    >
                        {this._renderMenu(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    // 根据当前菜单列表数据, 以及当前的路由路径, 获取到应该被展开的菜单项
    _getOpenKeys = (menuList, path) => {
        for (let i = 0; i < menuList.length; i++) {
            let item = menuList[i]
            if (item.children && item.children.find(c_item=> {
                return c_item._key === path
            })) {
               return item._key
            }
        }
        return ""
    }

    // 定义一个方法
    // 功能: 根据一个指定的key<获取到对应的icon, title
    _getMenuItem = (key, menuList=this.state.menuList) => {
        for (let i = 0; i < menuList.length; i++) {
            let item = menuList[i];
            if (item._key === key) {
                return {
                    title: item.title,
                    icon: item.icon
                }
            }

            if (item.children) {
                let result = this._getMenuItem(key, item.children)
                if (result) {
                    return result
                }
            }

        }
    }

    componentDidMount() {
        getMenuList().then(result=> {
            if (result.status === 0) {
                this.setState({
                    menuList: result.data
                })
            }
        })
    }

    render() {

        // 1. 获取到当前的路径, 路由
        let path = this.props.location.pathname
        let openKeys = this._getOpenKeys(this.state.menuList, path)
        console.log(path, openKeys, "当前计算出来的数据");

        // console.log(this._getMenuItem(path));
        let pub_menus = [];
        let currentKey = this._getMenuItem(path);
        if (currentKey) {
            pub_menus.push(currentKey)
        }
        let openMenu = this._getMenuItem(openKeys)
        if (openMenu) {
            pub_menus.unshift(openMenu)
        }
        console.log(pub_menus, "这就是需要传递给外界的菜单导航面包屑数据");
        publishMenu(pub_menus)

        return (
            <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
                <div className="logo">
                    <img src={xl} alt=""/>
                    <span className={this.props.collapsed?"close":""}>撩课-后台管理系统</span>
                </div>
                {this.state.menuList.length > 0 ? (
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[path]} defaultOpenKeys={[openKeys]}>
                        {this._renderMenu(this.state.menuList)}
                    </Menu>
                ): ""}

            </Sider>
        )
    }
}

export default withRouter(LeftNav)
