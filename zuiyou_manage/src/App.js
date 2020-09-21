import React, { Suspense, lazy } from "react";

import { Route, Redirect, Switch, withRouter, Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Avatar, Spin, Alert, Button } from "antd";
import {
  HomeOutlined,
  PieChartOutlined,
  UsergroupAddOutlined,
  SolutionOutlined,
  UsergroupDeleteOutlined,
  TeamOutlined,
  UserOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import "./App.scss";

const Home = lazy(() => import("./views/home/Home"));
const Login = lazy(() => import("./views/login/Login"));
const EditJurisdiction = lazy(() =>
  import("./views/jurisdiction/EditJurisdiction")
);
const AddJurisdiction = lazy(() =>
  import("./views/jurisdiction/AddJurisdiction")
);
const AddUser = lazy(() => import("./views/user/AddUser"));
const EditUser = lazy(() => import("./views/user/EditUser"));
const Reg = lazy(() => import("./views/login/Reg"));
const Msg = lazy(() => import("./views/msg/Msg"));

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
class App extends React.PureComponent {
  state = {
    collapsed: false,
    // 一级菜单
    menu: [
      {
        text: "首页",
        name: "home",
        icon: <HomeOutlined />,
        path: "/app/home",
      },
      {
        text: "动态信息",
        name: "msg",
        icon: <SolutionOutlined />,
        path: "/app/msg",
      },
    ],
    // 二级菜单
    secmenu: [
      [
        {
          title: "权限管理",
          icon: <UserOutlined />,
        },
        {
          text: "权限管理",
          name: "EditJurisdiction",
          icon: <EditOutlined />,
          path: "/app/EditJurisdiction",
        },
        {
          text: "申请权限",
          name: "AddJurisdiction",
          icon: <UserAddOutlined />,
          path: "/app/AddJurisdiction",
        },
      ],
      [
        {
          title: "用户管理",
          icon: <TeamOutlined />,
        },
        {
          text: "添加用户",
          name: "adduser",
          icon: <UsergroupAddOutlined />,
          path: "/app/adduser",
        },
        {
          text: "用户编辑",
          name: "edituser",
          icon: <SolutionOutlined />,
          path: "/app/edituser",
        },
      ],
    ],
    current: "",
    subcurrent: "",
    routelist: [],
  };
  // {!window.localStorage.getItem("user")
  // ? (({ key }) => {
  //     this.setState({ current: key });
  //     return <Route path="/login" component={Login}></Route>;
  //   })({ key: "Marlen" })
  // : ""}
  gotopage = ({ key }) => {
    // console.log(item, key);

    if (key == "/reg") {
      key = "/reg";
    } else {
      !window.localStorage.getItem("user") ? (key = "/login") : (key = key);
    }
    this.setState({
      current: key,
    });
    // console.log("gotopage", this);
    this.go(key);
  };
  go = (path) => {
    // console.log(this);
    this.props.history.push(path);
    this.state.routelist = [];
    this.state.routelist.push(path.replace(/\/[a-z,A-Z]+\//, ""));
    // console.log("state.route", this.state.routelist);
  };
  onCollapse = (collapsed) => {
    // console.log(collapsed);
    this.setState({ collapsed });
    // this.go(key);
  };
  componentWillMount() {
    // console.log("componetWillMount", this.props.location.pathname);
    let { pathname } = this.props.location;
    if (!this.state.current && this.props.location.pathname == "/app") {
      this.setState({
        current: "/app/home",
      });
    }
    this.state.current = pathname;
    if (pathname == "/app/EditJurisdiction") {
      this.state.subcurrent = "sub1";
    } else if (pathname == ("/app/adduser" || "/app/edituser")) {
      this.state.subcurrent = "sub2";
    } else {
      this.state.subcurrent = "";
    }
    this.state.routelist.push(pathname.replace(/\/[a-z,A-Z]+\//, ""));
  }

  render() {
    // console.log("第一次", this.state.current);
    let { menu, secmenu } = this.state;
    return (
      <>
        <Header className="Header_h1">
          <>
            <h1 style={{ color: "white", margin: 0, lineHeight: "64px" }}>
              知乎管理系统
            </h1>
            <div className="Header_h1">
              {(() => {
                console.log("sssss");
                if (window.localStorage.getItem("user")) {
                  return (
                    <>
                      <Avatar
                        style={{ backgroundColor: "#87d068" }}
                        size={38}
                        icon={<UserOutlined />}
                      />
                      <div style={{ paddingRight: "8px" }}></div>
                      <span
                        onClick={() => this.gotopage({ key: "/login" })}
                        style={{
                          color: "#1890ff",
                          fontSize: "18px",
                          cursor: "pointer",
                        }}
                      >
                        退出
                      </span>
                    </>
                  );
                } else {
                  return (
                    <>
                      <span
                        // 不懂的看看下面的this
                        onClick={() => this.gotopage({ key: "/login" })}
                        style={{
                          color: "#1890ff",
                          fontSize: "18px",
                          cursor: "pointer",
                        }}
                      >
                        登录
                      </span>
                      <div style={{ paddingRight: "12px" }}></div>
                      <span
                        onClick={this.gotopage.bind(null, { key: "/reg" })}
                        style={{
                          color: "#1890ff",
                          fontSize: "18px",
                          cursor: "pointer",
                        }}
                      >
                        注册
                      </span>
                    </>
                  );
                }
              })()}
            </div>
          </>
        </Header>
        <Layout>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <Menu
              theme="dark"
              // 组件封装好，如果使用这个onSelect，那么该方法会自动携带这个menu.item的某些属性（key，item。。。）
              onSelect={this.gotopage}
              defaultSelectedKeys={[this.state.current]}
              defaultOpenKeys={[this.state.subcurrent]}
              mode="inline"
            >
              {/* 渲染一层菜单 */}
              {menu.map((item) => {
                return (
                  <Menu.Item key={item.path} icon={item.icon}>
                    {item.text}
                  </Menu.Item>
                );
              })}
              {/* 渲染二层菜单 */}
              {secmenu.map((item, idx) => {
                return (
                  <SubMenu
                    key={"sub" + (idx + 1)}
                    icon={item[0].icon}
                    title={item[0].title}
                  >
                    {item.map((secitem, index) => {
                      // console.log("secitem", secitem, index);
                      if (index != 0) {
                        return (
                          <Menu.Item key={secitem.path} icon={secitem.icon}>
                            {secitem.text}
                          </Menu.Item>
                        );
                      }
                    })}
                  </SubMenu>
                );
              })}

              {/* <Menu.Item key="1" icon={<PieChartOutlined />}>
                 此处放折线图 
                Home
              </Menu.Item>
              <Menu.Item key="2" icon={<DesktopOutlined />}>
                 {"动态信息 "} 
                动态信息
              </Menu.Item>
              <SubMenu key="sub1" icon={<UserOutlined />} title="个人中心">
                 管理员个人信息的权限等 
                <Menu.Item key="3">Tom</Menu.Item>
                <Menu.Item key="4">Bill</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<TeamOutlined />} title="用户管理">
                 用户的注册信息 
                 看你个人需求，可以写一个组件，也可以分开写 
                <Menu.Item key="6">添加用户</Menu.Item>
                <Menu.Item key="8">编辑用户</Menu.Item>
              </SubMenu> */}
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: "0 16px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>app</Breadcrumb.Item>
                <Breadcrumb.Item>
                  {this.state.routelist[0] == "/app"
                    ? "home"
                    : this.state.routelist[0]}
                </Breadcrumb.Item>
              </Breadcrumb>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: "90%" }}
              >
                <Suspense
                  fallback={
                    <Spin tip="玩命加载中...">
                      <Alert />
                    </Spin>
                  }
                >
                  <Switch>
                    <Route path="/app/home" component={Home}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/reg" component={Reg}></Route>
                    <Route path="/app/Msg" component={Msg}></Route>
                    <Route
                      path="/app/EditJurisdiction"
                      component={EditJurisdiction}
                    ></Route>
                    <Route
                      path="/app/AddJurisdiction"
                      component={AddJurisdiction}
                    ></Route>
                    <Route path="/app/adduser" component={AddUser}></Route>
                    <Route path="/app/edituser" component={EditUser}></Route>
                    <Redirect from="/app" to="/app/home" exact></Redirect>
                    <Route path="*" render={() => <div>404</div>}></Route>
                  </Switch>
                </Suspense>
              </div>
            </Content>
            {/* <Footer style={{ textAlign: "center" }}>
              Ant Design ©2018 Created by Ant UED
            </Footer> */}
          </Layout>
        </Layout>
      </>
    );
  }
}
// 我们如果需要路由切换，那么我们需要使用这个高阶组件
App = withRouter(App);
export default App;
