import { Button, Card, WingBlank, WhiteSpace } from 'antd-mobile'
import React, { useEffect, useState } from 'react'
import '../scss/mine.scss'
import { withRouter } from 'react-router-dom'
import { LogoutOutlined } from '@ant-design/icons';
function Mine(props) {
  const [userInfo,setUserInfo] = useState(JSON.parse(sessionStorage.getItem('userInfo')))
  useEffect(() => {
    if (localStorage.getItem('userPhone')) {
      fetch('http://42.194.179.50/zyapi/login/check/?phone=' + localStorage.getItem('userPhone') + "&authorization=" + localStorage.getItem('yzId')).then(res => res.json()).then(data => {
        localStorage.setItem('yzId', data.data.authorization)
        sessionStorage.setItem('userInfo',JSON.stringify(data.data))
      })
    }
  }, [])
  return (
    <>
      <div className="dlzc">
        {
          localStorage.getItem('userPhone') ?
            <div className='isLogin'>
              <span className='set' onClick={() => {
                localStorage.removeItem('yzId');
                localStorage.removeItem('userPhone');
                sessionStorage.removeItem('userInfo');
                window.location.reload()
              }}><LogoutOutlined style={{ color: 'white', fontSize: 16 }} /></span>
              <WingBlank size="lg">
                <WhiteSpace size="lg" />
                <Card>
                  <Card.Header
                    title={333}
                    thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                    extra={<span>this is extra</span>}
                  />
                  <Card.Body>
                    <div>This is content of `Card`</div>
                  </Card.Body>
                  <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
                </Card>
                <WhiteSpace size="lg" />
              </WingBlank>
            </div>
            : <div>
              <p className='noLogin'>
                <Button style={{ width: 120, height: 40, borderRadius: 20, lineHeight: 3, color: '#1196fd' }}
                  onClick={() => { props.history.push('/Login_vcode') }}
                  size="small">立即登陆/注册</Button>
              </p>
              <div className="mine">
              </div>
            </div>

        }
        {/* <span className='set' onClick={()=>{
          localStorage.removeItem('yzId');
          localStorage.removeItem('userPhone');
          sessionStorage.removeItem('userInfo');
          window.location.reload()
        }}><LogoutOutlined style={{color:'white',fontSize:16}}/></span>
        <p>
          <Button style={{ width: 120, height: 40, borderRadius: 20, lineHeight: 3, color: '#1196fd' }}
            onClick={() => { props.history.push('/Login_vcode') }}
            size="small">立即登陆/注册</Button>
        </p> */}
      </div>


    </>
  )
}
export default withRouter(Mine)