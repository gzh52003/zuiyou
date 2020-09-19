import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "../views/history";
import App from "../App";
import Login from "../views/login/Login";
import Reg from "../views/login/Reg";
export default class MRoute extends Component {
  componentWillMount() {
    this.render();
  }
  componentDidMount() {
    this.render();
  }
  render() {
    return (
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/app" component={App}></Route>
        <Route path="/reg" component={Reg}></Route>
        <Redirect from="/" to="/login" exact></Redirect>
      </Switch>
    );
  }
}
