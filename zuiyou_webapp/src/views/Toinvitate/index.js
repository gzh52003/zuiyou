import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { Icon ,Button} from "antd-mobile";
import "antd-mobile/dist/antd-mobile.css";
import "../../scss/ToInvitate.scss";
import { GlobalContext } from "../../store";
function Index({ children }) {
  //   console.log(GlobalContext);
  const { state,dispatch } = useContext(GlobalContext);
  return (

  );
}
Index = withRouter(Index);
export default Index;
