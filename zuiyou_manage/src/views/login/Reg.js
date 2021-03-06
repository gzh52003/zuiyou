import React from "react";
import { Form, Input, Button, Checkbox, Select } from "antd";
import { UserOutlined, LockOutlined, SafetyOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { post, get } from "../../utils/request";
import checklocation from "../../utils/common";
// 调用action中的方法
import userAction, { login } from "../../store/actions/user";
// 用于合并action
import { bindActionCreators } from "redux";
import "../scss/login.scss";

const { Option } = Select;
@connect((state) => ({ manage: state.managetype }))
class Reg extends React.Component {
  state = {
    vcode: "",
  };
  handleSubmit = async (value, e) => {
    // this.props.history.push({ pathname: "/app" });
    const { username, password, code, select } = { ...value };
    // console.log({ ...value });
    if (username && password && select && code) {
      const checktest = await get("/reg/check", {
        manageName: value.username,
      }).then((res) => res);
      console.log(checktest, "checktest");
      if (checktest.code == 1) {
        const result = await post("/reg", { ...value, vcode: code }).then(
          (res) => res
        );
        if (result.code == 10) {
          alert("验证码输入错误！请重新输入");
          this.textInput.state.value = "";
          this.getVcode();
          return;
        } else {
          this.props.history.push("/manage");
        }
      } else {
        alert("用户已经存在");
        this.textInput.state.value = "";
        this.getVcode();
      }
      // if(result.data)
    }
  };
  // Markup = () => {
  //   console.log("sdfasd");
  //   return { __html: window.localStorage.getItem("vcode") };
  // };
  tess = (changedValues, allValues) => {
    console.log("changedValues", changedValues);
    // console.log("allValues", allValues);
  };
  onFinish = (value) => {
    console.log("Received values of form: ", value);

    this.handleSubmit(value);
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
    const result = await this.getVcode();
    window.localStorage.setItem("vcode", result);
    let code = await checklocation(this.props.history);
    console.log(this.props);
    if (code == this.props.manage.code) {
      console.log("我是成功的");
    } else {
      this.props.history.push("/login");
    }
    if (
      localStorage.getItem("manageType") == "b262f6241493f2e570c762e214066820"
    ) {
      this.props.history.push("/manage");
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
            name="select"
            // label="Select"
            hasFeedback
            rules={[{ required: true, message: "请选择权限!" }]}
          >
            <Select placeholder="请选择权限">
              <Option value="admin">管理员</Option>
              <Option value="vip">审评员</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="code"
            rules={[{ required: true, message: "请输入验证码!" }]}
          >
            <div className="demo">
              <Input
                prefix={<SafetyOutlined className="site-form-item-icon" />}
                placeholder="code"
                ref={(input) => {
                  this.textInput = input;
                }}
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
            <Form.Item>
              <Button
                type="primary"
                className="login-form-button"
                onClick={() => {
                  this.props.history.push("/manage");
                }}
              >
                取消
              </Button>
              <div style={{ width: 80 }}></div>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={this.handleSubmit}
              >
                注册
              </Button>
            </Form.Item>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Reg;
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
