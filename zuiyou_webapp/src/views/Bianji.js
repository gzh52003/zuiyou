import React, { Component } from 'react'
import { List, InputItem, PickerView, WhiteSpace,WingBlank, TextareaItem, Icon, Button } from 'antd-mobile';
import { createForm } from 'rc-form'
import { createFromIconfontCN } from '@ant-design/icons';
import '../scss/bianji.scss'
const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2085648_wxz5cftawuo.js',
});

class Bianji extends React.Component {
  state={
    userInfo:JSON.parse(sessionStorage.getItem('userInfo'))
  }
  render() {
    const { getFieldProps } = this.props.form;
    return (

      <List renderHeader={() => <p>😀 编辑您的个人信息 <Icon type='up' style={{ position: 'absolute', right: 12, top: 22 }} onClick={()=>{
        console.log(this.props.history);
        this.props.history.goBack()
      }}/></p>}>
        <InputItem
          className='nameInp'
          {...getFieldProps('autofocus')}
          style={{ height: 100 }}
          placeholder="昵称"
          value={this.state.userInfo.username}
          ref={el => this.autoFocusInst = el}
        >
          <img style={{ height: 80, width: 80 }}
            src='https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg' />
            <MyIcon type='icon-xiangji' 
            onClick={()=>{
              
            }}
            style={{position:'absolute',zIndex:10,left:66,background:'#fff',borderRadius:'50%',padding:3,top:68,boxShadow:'0 0 2px 0 #333'}}/>
        </InputItem>
        <List.Item>
          <div className='sexImp'>
            性别：
            <span onClick={(e) => {
              // e.target.checked = 'true'
              console.log(e.target);
            }}>
              <label htmlFor="female"><MyIcon style={{ fontSize: 16 }} type='icon-nv1'></MyIcon> 女</label>
              <input type='radio' name='gender' id="female" value='female' />
            </span>
            <span onClick={(e) => {
              // e.target.checked = 'true'
            }}>
              <label htmlFor="male"><MyIcon style={{ fontSize: 16 }} type='icon-nan1'></MyIcon> 男</label>
              <input type='radio' name='gender' id="male" value='male' />
            </span>
          </div>
        </List.Item>
        <WingBlank>
          <textarea
            style={{ width: '100%', height: 60, boxSizing: 'border-box',padding:8,color:'#6495ED',background:'#FFE4C4',resize:'none'}}
            placeholder=' 写下你的个人签名吧~'
            maxLength='120'
          />
          <span style={{color:'#999',fontSize:10}}>最大120个字符</span>
        </WingBlank>
        <div style={{padding:'2vh 36vw'}}>
        <Button type='ghost'>确定更改</Button>
        </div>
      </List>

    )
  }
}
const NewBianji = createForm()(Bianji);
export default NewBianji;