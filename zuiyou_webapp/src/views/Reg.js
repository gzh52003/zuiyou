import React from 'react'
import { Button, InputItem, Icon, Toast } from 'antd-mobile'
import { WechatOutlined, QqOutlined, WeiboOutlined } from '@ant-design/icons'
import { createForm } from 'rc-form'
import { createFromIconfontCN } from '@ant-design/icons';
import "../scss/reg.scss"
const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2085648_0to4nheze35.js',
});
class Reg extends React.Component {
  state = {
    phoneNum: '',
    password: '',
    type: 'password',
    isGetNum: false,
    num: 60,
    r1: false,
    r2: false
  }
  // 走短信验证码倒计时
  numRun = () => {
    if (this.state.r1 === false) { return }
    else {
      fetch('http://42.194.179.50/zyapi/phoneVcode/?phone=' + this.state.phoneNum).then((res) => res.json()).then((data) => {
        if (data.code === 1) {
          Toast.info('验证码已发送', 2, null, false);
          this.setState({ isGetNum: true });
          let time = setInterval(() => {
            this.setState({ num: this.state.num - 1 })
            if (this.state.num <= 0) {
              clearInterval(time);
              this.setState({ isGetNum: false, num: 60 })
            }
          }, 1000)
        } else {
          Toast.info('验证码发送失败', 2, null, false);
        }
      })
    }
  }
  goReg = () => {
    console.log(this.state.phoneNum, this.state.password);
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="regBlock">
        <div style={{ padding: 36, background: '#1E90FF' }}>
          <Icon onClick={() => { this.props.history.goBack() }} type='left' size='s' color="white" />
        </div>
        <div className="reg"
          style={{ padding: '60px 38px 97px' }}>
          <InputItem
            {...getFieldProps('phone')}
            type="phone"
            clear
            onBlur={async (e) => {
              await this.setState({ phoneNum: e.replace(/ +/g, '') });
              this.state.phoneNum.length == 11 ? this.setState({ r1: true }) : this.setState({ r1: false })
            }}
            placeholder="请输入手机号"
          >+86 <Icon type="down" size='xxs' /></InputItem>
          <InputItem
            style={{ textIndent: 16 }}
            maxLength={6}
            ref={inp => this.psd = inp}
            clear
            {...getFieldProps('password')}
            type="text"
            value={this.state.password}
            onChange={async (v) => {
              await this.setState({ password: v });
              if (this.state.password.length >= 6) { console.log(this, this.psd); };
              this.state.password.length == 6 ? this.setState({ r2: true }) : this.setState({ r2: false })
            }}
            placeholder="请输入验证码"
            extra={<span style={{ fontSize: 12, height: 21, width: 80 }}
              onClick={() => { this.numRun() }}>
              <span> | </span>
              {this.state.isGetNum ?
                <span style={{ width: 60, display: 'inline-block', textAlign: "center", color: '#1E90FF' }}>{this.state.num}</span>
                : '获取验证码'}</span>}
          ></InputItem>
          <InputItem
            type={this.state.type === 'password' ? 'password' : 'text'} maxLength={16}
            placeholder='设置6-16位密码' 
            clear
            extra={<span onClick={()=>this.state.type==='password'?this.setState({type:'text'}):this.setState({type:"password"})}>
              {this.state.type==='password'?
          <MyIcon type="icon-yanjing_bi" size='xxs' />
        :<MyIcon type="icon-yanjing_kai" size='xxs' />}
            </span>}
          ></InputItem>
          <Button type="primary" disabled={this.state.r1 && this.state.r2 ? false : true} onClick={this.goReg} style={{ borderRadius: 22, marginTop: 16, fontSize: 14 }}>注册</Button>
          <p>
            <span onClick={() => { this.props.history.push('/login_vcode') }}>登陆</span>
          </p>
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