import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
// 调用action中的方法
import userAction, { login } from "../../store/actions/user";
// 用于合并action
import { bindActionCreators } from "redux";
import "../scss/login.scss";
export default class Login extends React.Component {
  handleSubmit = (e) => {
    this.props.history.push({ pathname: "/app" });
  };
  onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  render() {
    return (
      <div
        id="login_big_box"
        style={{ backGround: "../../images/manage_background.jpg" }}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住密码</Checkbox>
            </Form.Item>
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
        </Form>
      </div>
    );
  }
}

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
