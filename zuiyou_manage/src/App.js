import React, { Suspense, lazy } from "react";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Avatar, Spin, Alert } from "antd";
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
import { connect } from "react-redux";
import "./App.scss";
import { get } from "./utils/request";
import checklocation from "./utils/common";
const Home = lazy(() => import("./views/home/Home"));
const Login = lazy(() => import("./views/login/Login"));
const EditJurisdiction = lazy(() =>
  import("./views/jurisdiction/EditJurisdiction")
);
const AddJurisdiction = lazy(() =>
  import("./views/jurisdiction/AddJurisdiction")
);
// const AddUser = lazy(() => import("./views/user/AddUser"));
const EditUser = lazy(() => import("./views/user/EditUser"));
const Reg = lazy(() => import("./views/login/Reg"));
const Invitation = lazy(() => import("./views/msg/Invitation"));
const Comment = lazy(() => import("./views/msg/Comment"));

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
@connect((state) => ({ manage: state.managetype }))
class App extends React.PureComponent {
  state = {
    type: "",
    collapsed: false,
    // 一级菜单
    menu: [
      {
        text: "首页",
        name: "home",
        icon: <HomeOutlined />,
        path: "/manage/home",
      },
    ],
    // 二级菜单
    secmenu: [
      [
        {
          title: "动态信息",
          icon: <SolutionOutlined />,
        },
        {
          text: "帖子管理",
          name: "Invitation",
          icon: <EditOutlined />,
          path: "/manage/Invitation",
        },
        {
          text: "评论管理",
          name: "Comment",
          icon: <EditOutlined />,
          path: "/manage/Comment",
        },
      ],
      [
        {
          title: "权限管理",
          icon: <UserOutlined />,
        },
        {
          text: "权限管理",
          name: "EditJurisdiction",
          icon: <EditOutlined />,
          path: "/manage/EditJurisdiction",
        },
        {
          text: "申请权限",
          name: "AddJurisdiction",
          icon: <UserAddOutlined />,
          path: "/manage/AddJurisdiction",
        },
      ],
      [
        {
          title: "用户管理",
          icon: <TeamOutlined />,
        },
        // {
        //   text: "添加用户",
        //   name: "adduser",
        //   icon: <UsergroupAddOutlined />,
        //   path: "/adduser",
        // },
        {
          text: "用户编辑",
          name: "edituser",
          icon: <SolutionOutlined />,
          path: "/manage/edituser",
        },
      ],
    ],
    current: "",
    subcurrent: "",
    routelist: [],
  };
  gotopage = ({ key }) => {
    // console.log(item, key);
    this.setState({
      current: key,
    });
    // console.log("gotopage", this);
    this.go(key);
  };
  jumpreg = () => {
    this.props.history.push("/reg");
  };
  jumplogin = () => {
    window.localStorage.clear();
    this.props.history.push("/login");
  };
  go = (path) => {
    // console.log(this);
    this.props.history.push(path);
    this.state.routelist = [];
    this.state.routelist.push(path.replace(/\/[a-zA-Z]+\//, ""));
    console.log("state.route", this.state.routelist);
  };
  onCollapse = (collapsed) => {
    // console.log(collapsed);
    this.setState({ collapsed });
    // this.go(key);
  };
  async componentWillMount() {
    // console.log("componetWillMount", this.props.location.pathname);
    console.log("我是conponnectwill", this.props);
    let { pathname } = this.props.location;
    if (!this.state.current && this.props.location.pathname == "/manage") {
      this.setState({
        current: "/manage/home",
      });
    }
    this.state.current = pathname;
    if (pathname == "/manage/Invitation" || pathname == "/manage/Comment") {
      this.state.subcurrent = "sub1";
    } else if (
      pathname === "/manage/EditJurisdiction" ||
      pathname == "/manage/AddJurisdiction"
    ) {
      this.state.subcurrent = "sub2";
    } else if (pathname === "/manage/edituser") {
      this.state.subcurrent = "sub3";
    } else {
      this.state.subcurrent = "";
    }
    this.state.routelist.push(pathname.replace(/\/[a-zA-Z]+\//, ""));
    console.log("this.state.subcurrent", this.state.subcurrent);
    let code = await checklocation(this.props.history);
    console.log("this.props", this.props);
    console.log("local", window.localStorage.getItem("code"));
    console.log("code", code);
    if (window.localStorage.getItem("code") == code) {
      console.log("scss");
    } else {
      this.props.history.push("/login");
    }
    // if (code == window.localStorage.getItem("code")) {
    //   console.log("我是成功的");
    // } else {
    //   this.props.history.push("/login");
    // }
    // let authorization = window.localStorage.getItem("authorization");
    // let manageType = window.localStorage.getItem("manageType");
    // let manageName = window.localStorage.getItem("manageName");
    // if (authorization && manageType && manageName) {
    //   const result = await get("/managelogin/angincheck", {
    //     manageName,
    //     manageType,
    //     authorization,
    //   }).then((res) => res);
    //   // console.log(result);
    //   console.log(result);
    //   if (manageName) {
    //   }
    //   if (result.code == 2000) {
    //     console.log(this.props);
    //   } else {
    //     this.props.history.push("/login");
    //     window.localStorage.clear();
    //   }
    // }
  }

  render() {
    // console.log("第一次", this.state.current);
    let { menu, secmenu, type } = this.state;

    return (
      <>
        <Header className="Header_h1">
          <>
            <h1 style={{ color: "white", margin: 0, lineHeight: "64px" }}>
              微博管理系统
            </h1>
            <div className="Header_h1">
              <Avatar
                style={{ backgroundColor: "#87d068" }}
                size={38}
                icon={<UserOutlined />}
              />
              <div style={{ paddingRight: "8px" }}></div>
              <span
                onClick={() => this.jumplogin()}
                style={{
                  color: "#1890ff",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                退出
              </span>
              <div style={{ paddingRight: "8px" }}></div>
              {window.localStorage.getItem("code") == "2000" ? (
                <span
                  onClick={() => this.jumpreg()}
                  style={{
                    color: "#1890ff",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                >
                  注册
                </span>
              ) : (
                ""
              )}
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
                      if (index !== 0) {
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
                <Breadcrumb.Item>manage</Breadcrumb.Item>
                <Breadcrumb.Item>
                  {this.state.routelist[0] === "/manage"
                    ? "home"
                    : this.state.routelist[0]}
                  {console.log("testtest", this.state.routelist[0])}
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
                    <Route path="/manage/home" component={Home}></Route>
                    <Route path="/manage/reg" component={Reg}></Route>
                    <Route path="/manage/Login" component={Login}></Route>
                    <Route
                      path="/manage/Invitation"
                      component={Invitation}
                    ></Route>
                    <Route path="/manage/Comment" component={Comment}></Route>
                    <Route
                      path="/manage/EditJurisdiction"
                      component={EditJurisdiction}
                    ></Route>
                    <Route
                      path="/manage/AddJurisdiction"
                      component={AddJurisdiction}
                    ></Route>
                    {/* <Route path="/adduser" component={AddUser}></Route> */}
                    <Route path="/manage/edituser" component={EditUser}></Route>
                    <Redirect from="/manage" to="/manage/home" exact></Redirect>
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
