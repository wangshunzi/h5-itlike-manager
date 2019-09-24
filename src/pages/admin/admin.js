import React, {Component} from "react"
import {Redirect, Switch, Route} from "react-router-dom"
import {isLogin} from "../../api/user-api";

import { Layout } from 'antd';
import "./admin.less"
import LeftNav from "./components/left-nav/left-nav"
import RightHeader from "./components/right-header/right-header"

import Home from "../home/home"
import User from "../user/user";
import Category from "../category/category";
import NotFound from "../not-found/not-found"



const { Content, Footer } = Layout;

export default class Admin extends Component {

    state = {
        collapsed: false,
    };

    _toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };


    render() {
        if (!isLogin()) {
            return <Redirect to={"/login"}/>
        }

        return (
            <Layout className={"adminPane"}>
                <LeftNav collapsed={this.state.collapsed}/>
                <Layout>
                    <RightHeader collapsed={this.state.collapsed} toggle={this._toggle}/>
                    <Content className={"adminContent"} >

                        <Switch>
                            <Redirect from={"/"} exact to={"/home"}/>
                            <Route path={"/home"} component={Home}/>
                            <Route path={"/user"} component={User}/>
                            <Route path={"/category"} component={Category}/>

                            <Route component={NotFound}/>
                        </Switch>

                    </Content>
                    <Footer className="foot">撩 课-刷题小程序后台管理系统</Footer>
                </Layout>
            </Layout>
        )
    }
}
