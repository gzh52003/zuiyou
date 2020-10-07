import React from 'react'
import { Button, InputItem, Icon, Toast } from 'antd-mobile'
import { WechatOutlined, QqOutlined, WeiboOutlined } from '@ant-design/icons'
import { createForm } from 'rc-form'
import "../scss/reg.scss"
import { createFromIconfontCN } from '@ant-design/icons';
const MyIcon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2085648_0to4nheze35.js',
});
class login_pas extends React.Component {
    state = {
        phoneNum: '',
        password: '',
        isGetNum: false,
        type: 'password',
        num: 60,
        r1: false,
        r2: false
    }
    // async componentDidMount(){
    //   await this.setState({phoneNum:this.props.location.state?this.props.location.state.phone:''})
    //   console.log(this.state.phoneNum);
    // }
    Login = () => {
        fetch('http://42.194.179.50/zyapi/login/?phone='+this.state.phoneNum+"&password="+
        this.state.password).then(res=>res.json()).then(data=>{
          if(data.code==1){
            sessionStorage.setItem('userInfo',JSON.stringify(data.data))
            localStorage.setItem('yzId',data.data.authorization)
            localStorage.setItem('userPhone',data.data.phone)
            this.props.history.push('/mine');
          }else{
            this.setState({password:''});
            Toast.info('账号密码错误！',2,null,false)
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
                            this.state.phoneNum.length == 11 ? this.setState({ r1: true }) : this.setState({ r1: false })
                        }}
                        placeholder="请输入手机号"
                    >+86 <Icon type="down" size='xxs' /></InputItem>
                    <InputItem
                        type={this.state.type}
                        maxLength={16}
                        placeholder="请输入密码"
                        onChange={async (e)=>{
                          await this.setState({password:e})
                          if(this.state.password.length>=6){
                            this.setState({r2:true})
                          }else{
                            this.setState({r2:false})
                          }
                        }}
                        extra={<span onClick={() => this.state.type === 'password' ? this.setState({ type: 'text' }) : this.setState({ type: "password" })}>
                            {this.state.type === 'password' ?
                                <MyIcon type="icon-yanjing_bi" size='xxs' />
                                : <MyIcon type="icon-yanjing_kai" size='xxs' />}
                        </span>}
                    ></InputItem>
                    <Button type="primary" disabled={this.state.r1 && this.state.r2 ? false : true} onClick={this.Login} style={{ borderRadius: 22, marginTop: 16, fontSize: 14 }}>登陆</Button>
                    <p>
                        <span onClick={() => { this.props.history.push('/login_vcode') }}>验证码登陆</span>
                        <span onClick={() => { this.props.history.push('/reg') }}>没有账号？</span>
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

const Newlogin_pas = createForm()(login_pas);

export default Newlogin_pas