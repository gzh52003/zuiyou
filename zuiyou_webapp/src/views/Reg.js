import React from 'react'
import {InputItem} from 'antd-mobile'
export default function(){
  const { getFieldProps } = this.props.form;
    return(
        <div><InputItem
        {...getFieldProps('phone')}
        type="phone"
        placeholder="186 1234 1234"
      >手机号码</InputItem>
      <InputItem
        {...getFieldProps('password')}
        type="password"
        placeholder="****"
      >密码</InputItem></div>
    )
}