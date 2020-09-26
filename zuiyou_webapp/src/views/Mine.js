import { Button ,Drawer} from 'antd-mobile'
import React from 'react'
import Reg from './Reg'
import '../scss/mine.scss'
export default function (props) {
    let isopen = false;
    return (
        <>
            <div className="dlzc">
                <p>
                    <Button style={{width:120,height:40,borderRadius:20,lineHeight:3,color:'#1196fd'}} 
                    onClick={()=>{isopen=true;console.log(isopen)}} 
                    size="small">立即登陆/注册</Button>
                </p>
            </div>
            <div className="mine">
            <Drawer
        className="my-drawer"
        position='right'
        style={{ maxHeight: document.documentElement.clientHeight,width:'100%'}}
        enableDragHandle
        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
        sidebar={<Reg/>}
        open={isopen}
        onOpenChange={!isopen}
        >
        <div>评论</div>
      </Drawer>
            </div>

        </>
    )
}