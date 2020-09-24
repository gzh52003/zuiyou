import React from 'react'
import { Button, InputItem, Icon } from 'antd-mobile'
import { WechatOutlined, QqOutlined, WeiboOutlined } from '@ant-design/icons'
import { createForm } from 'rc-form'
import "../scss/reg.scss"
class Reg extends React.Component {
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <>
        <div className="reg"><InputItem
          {...getFieldProps('phone')}
          type="phone"
          placeholder="请输入手机号"
        >+86 <Icon type="down" size='xxs' /></InputItem>
          <InputItem
            {...getFieldProps('password')}
            type="password"
            placeholder="请输入验证码"
          ></InputItem>
          <Button type="primary" style={{ borderRadius: 22, marginTop: 16, fontSize: 14 }}>登陆</Button>
          <p><span>密码登陆</span><span>无法登陆？</span></p>
        </div>
        <p style={{ width: "100%",marginTop:80, textAlign: "center", color: "#aaa", fontSize: 12 }}>—— 其他方式登陆 ——</p>
        <div class='botton'>
          <div class='Icon' style={{ background: "green" }}>
            <WechatOutlined />
          </div>
          <div class='Icon' style={{ background: "blue" }}>
            <QqOutlined />
          </div>
          <div class='Icon' style={{ background: "red" }}>
            <WeiboOutlined />
          </div>
        </div>
      </>
    )
  }
}

const NewReg = createForm()(Reg);

export default NewReg