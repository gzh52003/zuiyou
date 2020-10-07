import { Button, Drawer } from 'antd-mobile'
import React, { useEffect, useState } from 'react'
import '../scss/mine.scss'
export default function (props) {
  // useState()
  useEffect(() => {
    fetch('http://42.194.179.50/zyapi/login/check/?phone=' + localStorage.getItem('userPhone') + "&authorization=" + localStorage.getItem('yzId')).then(res => res.json()).then(data => {
      localStorage.setItem('yzId', data.data)
    })
  }, [])
  return (
    <>
      <div className="dlzc">
        <p>
          <Button style={{ width: 120, height: 40, borderRadius: 20, lineHeight: 3, color: '#1196fd' }}
            onClick={() => { props.history.push('/Login_vcode') }}
            size="small">立即登陆/注册</Button>
        </p>
      </div>
      <div className="mine">

      </div>

    </>
  )
}