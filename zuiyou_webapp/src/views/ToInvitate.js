import React , {useContext} from 'react'
import {withRouter} from 'react-router-dom'
import '../scss/ToInvitate.scss'
import {GlobalContext} from '../store'
function ToInvitate(){
    console.log(GlobalContext)
const {state,dispatch} = useContext(GlobalContext);
 return (
    <div className="ToInvitate" style={{height:"100%",width:"100%",top:state.showInvitate?"0%":'100%'}} >
        <button  onClick={()=>{dispatch({type:'noshow'})}}>取消</button>
        <button  onClick={()=>{dispatch({type:'noshow'})}}>发布</button>
    </div>

    )

}
ToInvitate=withRouter(ToInvitate)
export default ToInvitate