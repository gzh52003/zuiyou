import React from 'react'
import { Button, InputItem, Icon, Toast } from 'antd-mobile'
import { WechatOutlined, QqOutlined, WeiboOutlined } from '@ant-design/icons'
import { createForm } from 'rc-form'
import "../scss/reg.scss"
class Reg extends React.Component {
  state = {
    phoneNum: '',
    password: '',
    isGetNum: false,
    num: 60
  }
  // 走短信验证码倒计时
  numRun = () => {
    if (!this.state.isGetNum) {
      Toast.info('验证码已发送', 2, null, false);
      this.setState({ isGetNum: true });
      let time = setInterval(() => {
        this.setState({ num: this.state.num - 1 })
        if (this.state.num <= 0) {
          clearInterval(time);
          this.setState({ isGetNum: false, num: 60 })
        }
      }, 1000)
    }
  }
  goReg = () => {
    console.log(this.state.phoneNum,this.state.password);
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="regBlock">
        <div style={{ padding: 36, background: '#1E90FF' }}>
          <Icon onClick={() => { this.props.history.goBack() }} type='left' size='s' color="white" />
        </div>
        <div className="reg">
          <InputItem
            {...getFieldProps('phone')}
            type="phone"
            clear
            onBlur={(e) => {console.log(e,e.trim());;this.setState({phoneNum:e.trim()})}}
            placeholder="请输入手机号"
          >+86 <Icon type="down" size='xxs' /></InputItem>
          <InputItem
            {...getFieldProps('password')}
            type="text"
            onBlur={(e) => {this.setState({password:e})}}
            placeholder="请输入验证码"
            extra={<span style={{ fontSize: 12, height: 21, width: 80 }}
              onClick={() => { this.numRun() }}>
              <span> | </span>
              {this.state.isGetNum ?
                <span style={{ width: 60, display: 'inline-block', textAlign: "center", color: '#1E90FF' }}>{this.state.num}</span>
                : '获取验证码'}</span>}
          ></InputItem>
          <Button type="primary" onClick={this.goReg} style={{ borderRadius: 22, marginTop: 16, fontSize: 14 }}>登陆</Button>
          <p><span>密码登陆</span><span>无法登陆？</span></p>
        </div>
        <p style={{ width: "100%", marginTop: 80, textAlign: "center", color: "#aaa", fontSize: 10 }}>—— 其他方式登陆 ——</p>
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