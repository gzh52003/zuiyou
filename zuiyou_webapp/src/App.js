import React, { lazy, Suspense } from "react";
import { Route, Redirect, Switch} from "react-router-dom";
import "./scss/App.scss";
import "antd-mobile/dist/antd-mobile.css";
const Footer = lazy(() => import("./Footer"));
const Home = lazy(() => import("./views/Home"));
const Found = lazy(() => import("./views/Found"));
const News = lazy(() => import("./views/News"));
const Mine = lazy(() => import("./views/Mine"));

function App() {
  return (
    <>
    {/* <Flex direction="column"> */}
    <div className="flex-container">
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
