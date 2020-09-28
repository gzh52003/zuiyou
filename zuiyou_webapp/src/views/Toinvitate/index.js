import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { Icon ,Button} from "antd-mobile";
import "antd-mobile/dist/antd-mobile.css";
import "../../scss/ToInvitate.scss";
import "../../iconfont/iconfont.css";
import { GlobalContext } from "../../store";
function Index({ children }) {
  //   console.log(GlobalContext);
  const { state,dispatch } = useContext(GlobalContext);
  return (
    <div
      className="addMedia"
      style={{
        width: "100%",
        top: state.showAddMedia ? "0%" : "100%",
      }}
    >
    <div className="showner-box">
        <Icon
          type="cross"
          size="md"
          className="cancel"
          onClick={() => {
            dispatch({ type: "noshowAddMedia" });
          }}
        />
         <Button
          className="publish"
          size="sm"
          type="primary"
          onClick={() => {
            dispatch({ type: "noshowAddMedia" });
          }}
        >
          发布
        </Button>
     </div>
     <div className="chose-category">
        <span style={{ float: "left" }}>
          <i className="iconfont icon-jinghao"></i>选择话题
        </span>
        <span style={{ float: "right" }}>选择合适的话题会有更多赞哦~ &gt;</span>
      </div>
      {children}
    </div>
  );
}
Index = withRouter(Index);
export default Index;
