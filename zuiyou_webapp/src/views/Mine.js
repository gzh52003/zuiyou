import { Button ,Drawer} from 'antd-mobile'
import React from 'react'
import Reg from './Reg'
import '../scss/mine.scss'
export default function (props) {
    return (
        <>
            <div className="dlzc">
                <p>
                    <Button style={{width:120,height:40,borderRadius:20,lineHeight:3,color:'#1196fd'}} 
                    onClick={()=>{props.history.push('/reg')}} 
                    size="small">立即登陆/注册</Button>
                </p>
            </div>
            <div className="mine">
          
            </div>

        </>
    )
}