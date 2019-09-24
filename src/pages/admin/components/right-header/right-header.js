import React, {Component} from "react"
import {Icon, Layout, Button,Modal, Breadcrumb } from "antd";
import {withRouter} from "react-router-dom"
import "./right-header.less"
import PropTypes from "prop-types"
import {getUser, loginOut } from "../../../../api/user-api"
import {getWeather } from "../../../../api/weather-api"
import { subMenu } from "../../../../api/menu-api"
import {timeFormat} from "../../../../tools/date-tool"

const {Header} = Layout
const {Item} = Breadcrumb
class RightHeader extends Component {

    state = {
        currentTime: "",
        picURL: "",
        notice: "",
        breadMenus: []
    }

    static propTypes = {
        collapsed: PropTypes.bool,
        toggle: PropTypes.func
    };

    _loginOut = () => {
        Modal.confirm({
            title: '确认退出吗?',
            content: '如果你想退出, 那么就退出吧',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                loginOut()
                this.props.history.replace("/login");
            },
            onCancel() {
                // console.log('Cancel');
            },
        });
    }

    componentDidMount() {

        subMenu((msg, data) => {
            console.log("接收到, 别人发布的数据", data);
            this.setState({
                breadMenus: data
            })
        })

        getWeather().then(result => {
            this.setState({
                picURL: result.picURL,
                notice: result.notice,
            })
        })

        this.timer = setInterval(()=>{
            this.setState({
                currentTime: timeFormat(Date.now())
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }


    render() {
        let user = getUser()
        return (
            <Header className={"header"}>
                <Icon
                    className="trigger"
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.toggle}
                />
                <div className="top">
                    <span>欢迎您: {user.userName}</span>
                    <Button type="danger" className="exitBtn" onClick={this._loginOut}>退出</Button>
                </div>
                <div className="bottom">
                    <div className="left">
                        <Breadcrumb>

                            {this.state.breadMenus.map(item => {
                               return (
                                    <Item key={item.title}>
                                        <Icon type={item.icon} />
                                        <span>{item.title}</span>
                                    </Item>
                               )
                            })}
                        </Breadcrumb>

                    </div>
                    <div className="right">
                        <span className={"time"}>{this.state.currentTime}</span>
                        <img src={this.state.picURL} alt=""/>
                        <span>{this.state.notice}</span>
                    </div>

                </div>
            </Header>
        )
    }
}

export default withRouter(RightHeader)
