import React from 'react'
import { Button, InputItem, Icon, Toast,Modal } from 'antd-mobile'
import { WechatOutlined, QqOutlined, WeiboOutlined } from '@ant-design/icons'
import { createForm } from 'rc-form'
import "../scss/reg.scss"
const alert = Modal.alert;
class login_vcode extends React.Component {
  state = {
    phoneNum: '',
    vnum: '',
    isGetNum: false,
    num: 60,
    r1: false,
    r2: false,
    isOkVnum:true,
  }
  // 走短信验证码倒计时
  numRun = () => {
    if (this.state.r1 === false||this.state.isGetNum===true) { return }
    else {
      if(this.state.isOkVnum){
      fetch('http://42.194.179.50/zyapi/phoneVcode/?phone=' + this.state.phoneNum,{credentials:'include'}).then((res) => res.json()).then((data) => {
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
      Toast.info('账号不存在',2,null,false)
    }
    }
  }
  goLogin = () => {
    console.log(this.state.phoneNum, this.state.vnum);
    fetch('http://42.194.179.50/zyapi/login/vnum/?phone='+this.state.phoneNum+"&vnum="+
        this.state.vnum,{credentials:'include'}).then(res=>res.json()).then(data=>{
          if(data.code==1){
            sessionStorage.setItem('userInfo',JSON.stringify(data.data))
            localStorage.setItem('yzId',data.data.authorization)
            localStorage.setItem('userPhone',data.data.phone)
            this.props.history.push('/mine');
          }else{
            this.setState({password:''});
            Toast.info('登陆失败！',2,null,false)
          }
        })
  }
  loginCheck=()=>{
    this.setState({ r1: true })
    fetch('http://42.194.179.50/zyapi/reg/check/?phone=' + this.state.phoneNum).then(res => res.json()).then(data => {
      if (data.code == "1") {
        alert('账号不存在', '是否立即注册新账号？', [
          { text: '否', onPress: () => { this.setState({isOkVnum:false})} },
          {
            text: '是', onPress: () => this.props.history.push({
              pathname: "/reg", state: { phone: this.state.phoneNum }
            })
          },
        ])
      }else{
        this.setState({isOkVnum:true})
      }
    })
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="regBlock">
        <div style={{ padding: 36, background: '#1E90FF' }}>
          <Icon onClick={() => { this.props.history.push('/mine') }} type='cross' size='s' color="white" />
        </div>
        <div className="reg">
          <InputItem
            {...getFieldProps('phone')}
            type="phone"
            clear
            onBlur={async (e) => {
              await this.setState({ phoneNum: e.replace(/ +/g, '') });
              this.state.phoneNum.length == 11 ? this.loginCheck() : this.setState({ r1: false })
            }}
            placeholder="请输入手机号"
          >+86 <Icon type="down" size='xxs' /></InputItem>
          <InputItem
            style={{ textIndent: 16 }}
            maxLength={6}
            ref={inp=>this.psd = inp}
            clear
            {...getFieldProps('vnum')}
            type="text"
            value={this.state.vnum}
            onChange={async (v) => {
              await this.setState({ vnum: v });
              if(this.state.vnum.length>=6){console.log(this,this.psd);};
              this.state.vnum.length == 6 ? this.setState({ r2: true }) : this.setState({ r2: false })
            }}
            placeholder="请输入验证码"
            extra={<span style={{ fontSize: 12, height: 21, width: 80 }}
              onClick={() => { this.numRun() }}>
              <span> | </span>
              {this.state.isGetNum ?
                <span style={{ width: 60, display: 'inline-block', textAlign: "center", color: '#1E90FF' }}>{this.state.num}</span>
                : '获取验证码'}</span>}
          ></InputItem>
          <Button type="primary" disabled={this.state.r1 && this.state.r2 ? false : true} onClick={this.goLogin} style={{ borderRadius: 22, marginTop: 16, fontSize: 14 }}>登陆</Button>
          <p>
            <span onClick={()=>{this.props.history.push('/login_pas')}}>密码登陆</span>
          <span onClick={()=>{this.props.history.push('/reg')}}>没有账号？</span>
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

const Newlogin_vcode = createForm()(login_vcode);

export default Newlogin_vcode