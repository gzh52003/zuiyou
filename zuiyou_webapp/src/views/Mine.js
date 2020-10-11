import { Button, Card, WingBlank, WhiteSpace, Flex } from 'antd-mobile'
import React, { useEffect, useState } from 'react'
import '../scss/mine.scss'
import { withRouter } from 'react-router-dom'
import { LogoutOutlined,createFromIconfontCN } from '@ant-design/icons';
const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2085648_2x7r59pcw7m.js',
});
function Mine(props) {
  const [userInfo,setUserInfo] = useState(JSON.parse(sessionStorage.getItem('userInfo')))
  useEffect(() => {
    if (localStorage.getItem('userPhone')) {
      fetch('http://42.194.179.50/zyapi/login/check/?phone=' + localStorage.getItem('userPhone') + "&authorization=" + localStorage.getItem('yzId')).then(res => res.json()).then(data => {
        localStorage.setItem('yzId', data.data[0].authorization)
        sessionStorage.setItem('userInfo',JSON.stringify(data.data[0]))
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
                    title={<div>{userInfo.username} <MyIcon style={{fontSize:16}} type={userInfo.gender==='female'?'icon-nv1':'icon-nan1'}></MyIcon></div>}
                    thumb={userInfo.iconUrl!==''?userInfo.iconUrl:"https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"}/>
                  <Card.Body>
                    <div style={{color:'#222'}}>{userInfo.desc}</div>
                  </Card.Body>
                  <Card.Footer style={{color:'#eee',fontSize:14}} content={userInfo.follow+' 粉丝 ' + userInfo.followed.length+' 关注'} 
                    extra={<MyIcon onClick={()=>{
                      props.history.push('/Bianji');
                    }} type='icon-bianji' style={{width:36,opacity:0.6}}></MyIcon>}
                  />
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
      </div>


    </>
  )
}
export default withRouter(Mine)