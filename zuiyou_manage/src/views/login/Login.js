import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, SafetyOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { post, get } from "../../utils/request";
// 调用action中的方法
import userAction, { login } from "../../store/actions/user";
// 用于合并action
import { bindActionCreators } from "redux";
import "../scss/login.scss";

@connect()
class Login extends React.Component {
  state = {
    vcode: "",
  };
  handleSubmit = async (value, e) => {
    // this.props.history.push({ pathname: "/app" });
    console.log(value);

    const result = await post("/managelogin", {
      username: value.username,
      password: value.password,
      remember: JSON.stringify(value.remember),
      vcode: value.code,
      // ...value,
    }).then(
      (res) => res
      // () => {
      //   window.alert("错误");
      // }
    );

    if (result.code == 0) {
      this.getVcode();
      this.textInput.state.value = "";
      alert("用户名或密码错误");
    } else if (result.code == 10) {
      this.textInput.state.value = "";
      this.getVcode();
      alert("验证码错误，请重新输入！");
    } else if (result.code == 304) {
      alert("你已经被禁用了！晚上来我办公室解密。");
      return;
    } else {
      // console.log(result.data.authorization);
      // console.log(result.data.manageName);
      console.log(result);
      window.localStorage.setItem("authorization", result.data.authorization);
      window.localStorage.setItem("manageType", result.data.manageType);
      window.localStorage.setItem("manageName", result.data.manageName);
      window.localStorage.setItem("code", 2000);
      this.props.dispatch({
        type: "manage",
        manage: {
          manageName: result.data.manageName,
          manageType: result.data.manageType,
          authorization: result.data.authorization,
          code: 2000,
        },
      });
      this.props.history.push("/manage");

      // this.props.history.push("/manage");
    }
    console.log(result);
  };
  // aa = (changedValues, allValues) => {
  //   console.log("changedValues", changedValues);
  //   console.log("allValues", allValues);
  // };
  onFinish = (values) => {
    // console.log("Received values of form: ", values);
    this.handleSubmit(values);
  };

  getVcode = async () => {
    const vcode = await get("/vcode").then((res) => res.data);
    // console.log(vcode);
    // react只能通过setState修改state的值
    this.setState({
      vcode: vcode,
    });
    // console.log(this.state.vcode);
    window.localStorage.setItem("vcode", vcode);
    return vcode;
  };
  async componentWillMount() {
    console.log(this.props);
    this.getVcode();
    let authorization = window.localStorage.getItem("authorization");
    let manageName = window.localStorage.getItem("manageName");
    let manageType = window.localStorage.getItem("manageType");
    let code = window.localStorage.getItem("code");

    // 用户登录为过时，就跳转到原页面
    if (authorization && manageName && manageType && code) {
      const result = await get("/managelogin/check", {
        authorization,
        manageName,
        manageType,
      }).then((res) => res);
      console.log(result);
      if (result.code == 200) {
        this.props.history.push("/manage");
      }
    } else {
      const result = await this.getVcode();
      window.localStorage.clear();
      window.localStorage.setItem("vcode", result);
    }
  }
  render() {
    const str = this.state.vcode;
    return (
      <div
        id="login_big_box"
        style={{ backGround: "../../images/manage_background.jpg" }}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          // onValuesChange={this.aa(changedValues, allValues)}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入用户名!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[{ required: true, message: "请输入验证码!" }]}
          >
            <div className="demo">
              <Input
                ref={(input) => {
                  this.textInput = input;
                }}
                prefix={<SafetyOutlined className="site-form-item-icon" />}
                placeholder="code"
              />
              <div
                className="code ant-input"
                onClick={async () => await this.getVcode()}
                dangerouslySetInnerHTML={{
                  __html: str,
                }}
              ></div>
            </div>
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住密码</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Login;
//使用高阶组件  react-redux里面有两个很重要的组件，Provider和connect

// // const mapStateToProps = ({currentUser})=>({currentUser}) 相当于
// // 映射props，也就是说，从redux的store仓库中，映射出一个对象给组件用（放在props参数中），当然要插进去后面的connect方法中
// const mapStateToProps = function (state) {
//   return { currenUser: state.currentUser };
// };
// // 映射方法，也就是说，把这个方法映射给这个ui组件使用
// /**
//  *
//  * @param dispatch
//  * 本来我们的组件如果要使用store仓库的数据的话，只能通过方法store.dispatch(action)去调用对吧，现在我们组件只需要使用props下面的login方法（放在props参数中）即可
//  */
// const mapDispatchProps = function (dispatch) {
//   return {
//     login(user) {
//       // 方案1：不引入其他的
//       dispatch({ type: "login", user });
//       /* 方案2：引入了../../store/actions/user.js
//         那么就可以这里这样调用：dispatch(login(user))
//       */
//     },
//   };
//   /* 方案3：引入了
//         1、import userAction, { login } from "../../store/actions/user";
//         2、import { bindActionCreators } from "redux";
//       那么这里就可以直接：return bindActionCreators(userAction,dispatch)
//       这个bindActionCreators 里面隐式调用了我们的dispatch
//       相当于的代码：{login,logout} 等效于以下代码(bindActionCreators内部帮我们实现了以下代码)
//     // {
//     //     login: function(user){
//     //         dispatch(login(user))
//     //     },
//     //     logout:function(){
//     //         dispatch(logout())
//     //     }
//     // }

//     总结：bindActionCreators帮我们实现了方案2里面的功能

//   */
// };

// Login = connect(mapStateToProps, mapDispatchProps)(Login);
