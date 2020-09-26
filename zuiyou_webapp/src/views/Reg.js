import React from 'react'
import { Button, InputItem, Icon } from 'antd-mobile'
import { WechatOutlined, QqOutlined, WeiboOutlined } from '@ant-design/icons'
import { createForm } from 'rc-form'
import "../scss/reg.scss"
class Reg extends React.Component {
  state={
    phoneNum:'',
    password:''
  }
  goReg=()=>{
    console.log(this.state.password);
  }
  psdChange=()=>{

    // console.log(this.inptxt.value);
    this.setState({password:this.inptxt.value})
  }
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="regBlock">
        <div className="reg"><InputItem
          {...getFieldProps('phone')}
          type="phone"
          placeholder="请输入手机号"
        >+86 <Icon type="down" size='xxs' /></InputItem>
          <InputItem
            {...getFieldProps('password')}
            type="password"
            value={this.state.password}
            ref={(inp)=>{this.inptxt = inp}}
            onChange={this.psdChange}
            placeholder="请输入验证码"
          ></InputItem>
          <Button type="primary" onClick={this.goReg} style={{ borderRadius: 22, marginTop: 16, fontSize: 14 }}>注册</Button>
          <p><span>密码登陆</span><span>无法登陆？</span></p>
        </div>
        <p style={{ width: "100%",marginTop:80, textAlign: "center", color: "#aaa", fontSize: 12 }}>—— 其他方式登陆 ——</p>
        <div className='botton'>
          <div className='Icon' style={{ background: "#00CD66" }}>
            <WechatOutlined />
          </div>
          <div className='Icon' style={{ background: "#00C5CD" }}>
            <QqOutlined />
          </div>
          <div className='Icon' style={{ background: "#FF3030" }}>
            <WeiboOutlined />
          </div>
        </div>
      </div>
    )
  }
}

const NewReg = createForm()(Reg);

export default NewReg