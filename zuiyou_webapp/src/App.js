import React, { lazy, Suspense, useContext } from "react";
import { Route, Redirect, Switch} from "react-router-dom";
import {GlobalContext} from './store/index'
import "./App.scss";
import "antd-mobile/dist/antd-mobile.css";
import ToInvitate from "./views/ToInvitate";
const Footer = lazy(() => import("./Footer"));
const Home = lazy(() => import("./views/Home"));
const Found = lazy(() => import("./views/Found"));
const News = lazy(() => import("./views/News"));
const Mine = lazy(() => import("./views/Mine"));
const Reg = lazy(() => import("./views/Reg"));

function App() {
  const {state } = useContext(GlobalContext)
  return (
    <>
    {/* <Flex direction="column"> */}
    <ToInvitate></ToInvitate>
    <div className="flex-container" style={{display:state.showInvitate?"none":"flex"}}>
        <Suspense
          fallback={
            <div>内容加载中</div>
          }
          >
          <main className="mainer">
          <Switch>
            <Route path="/Home" component={Home}></Route>
            <Route path="/Found" component={Found}></Route>
            <Route path="/News" component={News}></Route>
            <Route path="/Mine" component={Mine}></Route>
            <Route path="/Reg" component={Reg}></Route>
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
