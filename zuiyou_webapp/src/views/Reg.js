import React from 'react'
import {Button, InputItem} from 'antd-mobile'
import {createForm} from 'rc-form' 
class Reg extends React.Component{
  render(){
    const { getFieldProps } = this.props.form;
    return(
        <div><InputItem
        {...getFieldProps('phone')}
        type="phone"
        placeholder="填写本人手机号"
      >手机号码</InputItem>
      <InputItem
        {...getFieldProps('password')}
        type="password"
        placeholder="6~12位数字、字母"
      >密码</InputItem>
      <Button type="primary" style={{marginTop:8}}>免费注册</Button>
      </div>
    )
  }
}

const NewReg = createForm()(Reg);

export default NewReg