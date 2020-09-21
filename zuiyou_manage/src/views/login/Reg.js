import React from "react";

export default class Reg extends React.Component {
  handleSubmit = (e) => {
    this.props.history.push({ pathname: "/login" });
  };
  render() {
    return (
      <>
        <div>{"Reg"}</div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="userName" />
          <input type="text" placeholder="repo" />
          <button type="submit">Go Login</button>
        </form>
      </>
    );
  }
}
