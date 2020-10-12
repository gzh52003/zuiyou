import React, { lazy, Suspense, useContext } from "react";
import { Route, Redirect, Switch} from "react-router-dom";
import {GlobalContext} from './store/index'
import "./App.scss";
import "antd-mobile/dist/antd-mobile.css";
import ToInvitate from "./views/Toinvitate/ToInvitate";
import Comment from "./views/Comment/Comment";
import { Progress } from "antd-mobile";

// 刘益良页面
import Login_vcode from './views/Login_vcode'
import Login_pas from './views/Login_pas'
import Reg from './views/Reg'
import Mine from './views/Mine'
import Bianji from './views/Bianji'


const Footer = lazy(() => import("./Footer"));
const Home = lazy(() => import("./views/Home"));
const Found = lazy(() => import("./views/Found"));
const News = lazy(() => import("./views/News"));
// const Mine = lazy(() => import("./views/Mine"));
// const Reg = lazy(()=>import("./views/Reg"))
// const Login_vcode = lazy(() => import("./views/Login_vcode"));
// const Login_pas = lazy(() => import("./views/Login_pas"));

function App() {
  const {state} = useContext(GlobalContext)
  return (
    <>
    {/* <Flex direction="column"> */}
    <Comment/>
    <ToInvitate/>
    {/* <AddPicture/> */}
    <div className="flex-container" >
        <Suspense
          fallback={
            <div>内容加载中</div>
          }
          >
          <div style={{display:state.percent===0||state.percent===100?"none":"block"}}>
           <Progress percent={state.percent}  position="normal" />
           <span style={{fontSize:"12px"}}>内容正在发布中...</span>
          </div>
          <main className="mainer">
          <Switch>
            <Route path="/Home" component={Home}></Route>
            <Route path="/Found" component={Found}></Route>
            <Route path="/News" component={News}></Route>

            <Route path="/Mine" component={Mine}></Route>
            <Route path="/Bianji" component={Bianji}></Route>
            <Route path="/Reg" component={Reg}></Route>
            <Route path="/Login_vcode" component={Login_vcode}></Route>
            <Route path="/Login_pas" component={Login_pas}></Route>

            <Redirect from="/" to="/home" exact></Redirect>
            <Route path="*" render={() => <div>404</div>}></Route>
          </Switch>
          </main>
          <Footer></Footer>
        </Suspense>
    </div>
    {/* </Flex> */}
    </>
  );
}
export default App;
