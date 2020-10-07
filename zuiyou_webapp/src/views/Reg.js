import React from 'react'
import { Button, InputItem, Icon, Toast, Modal } from 'antd-mobile'
import axios from 'axios'
import { WechatOutlined, QqOutlined, WeiboOutlined } from '@ant-design/icons'
import { createForm } from 'rc-form'
import "../scss/reg.scss"
import { createFromIconfontCN } from '@ant-design/icons';
const alert = Modal.alert;
const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2085648_0to4nheze35.js',
});
class Reg extends React.Component {
  state = {
    phoneNum: '',
    password: '',
    vnum: '',
    type: 'password',
    isGetNum: false,
    num: 60,
    r1: false,
    r2: false,
    isOk:true
  }
  // 走短信验证码倒计时
  numRun = () => {
    if (this.state.r1 === true && this.state.isGetNum === false && this.state.isOk) {
      fetch('http://42.194.179.50/zyapi/phoneVcode/?phone=' + this.state.phoneNum,{credentials: 'include',}).then((res) => res.json()).then((data) => {
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
    }else{
      return 
    }
  }
  regCheck = () => {
    this.setState({ r1: true });
    fetch('http://42.194.179.50/zyapi/reg/check/?phone=' + this.state.phoneNum).then(res => res.json()).then(data => {
      if (data.code == "0") {
        alert('', '已有账号，是否直接登陆？', [
          { text: '否', onPress: () => { this.setState({isOk:false})} },
          {
            text: '是', onPress: () => this.props.history.push({
              pathname: "/login_pas", state: { phone: this.state.phoneNum }
            })
          },
        ])
      }else{
        this.setState({isOk:true})
      }
    })
  }
  goReg = () => {
    if(this.state.isOk){
      fetch('http://42.194.179.50/zyapi/reg/', {
        method: 'post',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({
          phone: this.state.phoneNum,
          password: this.state.password,
          vnum: this.state.vnum
        })
      }).then(res => res.json()).then(data => {
        if (data.code == 1) {
          sessionStorage.setItem('userInfo',JSON.stringify(data.data))
          localStorage.setItem('yzId',data.data.authorization)
          localStorage.setItem('userPhone',data.data.phone)
          this.props.history.push('/mine');
        } else if(data.code == 10){
          Toast.info('验证码错误', 3, null, false)
        }else {
          this.setState({ password: '' });
          Toast.info('注册失败,再尝试一下吧', 4, null, false)
        }
      })
    }else{
      Toast.info('注册失败，账号已存在',2,null,false)
    }
  }
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="regBlock">
        <div style={{ padding: 36, background: '#1E90FF' }}>
          <Icon onClick={() => { this.props.history.push('/mine') }} type='cross' size='s' color="white" />
        </div>
        <div className="reg"
          style={{ padding: '60px 38px 97px' }}>
          <InputItem
            {...getFieldProps('phone')}
            type="phone"
            clear
            onBlur={async (e) => {
              await this.setState({ phoneNum: e.replace(/ +/g, '') });
              this.state.phoneNum.length == 11 ? this.regCheck() : this.setState({ r1: false })
            }}
            placeholder="请输入手机号"
          >+86 <Icon type="down" size='xxs' /></InputItem>
          <InputItem
            style={{ textIndent: 16 }}
            maxLength={6}
            type='text'
            clear
            type="text"
            value={this.state.vnum}
            onChange={async (v) => {
              await this.setState({ vnum: v });
              this.state.vnum.length == 6 ? this.setState({ r3: true }) : this.setState({ r3: false })
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
            style={{ textIndent: 16 }}
            value={this.state.password}
            onBlur={() => {
              if (!(this.state.password.length >= 6 && this.state.password.length <= 16)) {
                Toast.info('密码应为6-16位！', 2, null, false)
              };
            }
            }
            onChange={async (v) => {
              await this.setState({ password: v });
              this.state.password.length >= 6 && this.state.password.length <= 16 ? this.setState({ r2: true }) : this.setState({ r2: false })
            }}
            clear
            extra={<span onClick={() => this.state.type === 'password' ? this.setState({ type: 'text' }) : this.setState({ type: "password" })}>
              {this.state.type === 'password' ?
                <MyIcon type="icon-yanjing_bi" size='xxs' />
                : <MyIcon type="icon-yanjing_kai" size='xxs' />}
            </span>}
          ></InputItem>
          <Button type="primary" disabled={this.state.r1 && this.state.r2 && this.state.r3 ? false : true} onClick={this.goReg} style={{ borderRadius: 22, marginTop: 16, fontSize: 14 }}>注册</Button>
          <p>
            <span onClick={() => { this.props.history.push('/login_vcode') }}>已有账号，马上登陆</span>
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