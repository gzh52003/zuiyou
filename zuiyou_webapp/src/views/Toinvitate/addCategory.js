import React, {  useContext } from "react";
import { Tabs } from "antd-mobile";
import "../../scss/addCategory.scss";
import { GlobalContext } from "../../store";
const tabs = [
  { title: "搞笑", key: "t1" },
  { title: "校园", key: "t2" },
  { title: "日常", key: "t3" },
  { title: "明星", key: "t4" },
  { title: "体育", key: "t5" },
  { title: "游戏", key: "t6" },
  { title: "时尚美妆", key: "t7" },
  { title: "生活分享", key: "t8" },
  { title: "二次元", key: "t9" },
];

function AddCategory() {
  const { state, dispatch } = useContext(GlobalContext);
  let result;
  return (
    <div
      style={{ top: state.showAddCategory ? "0" : "100%" }}
      className="add-category"
    >
      <Tabs
        tabs={tabs}
        tabBarPosition="left"
        initialPage={1}
        onChange={(tab, index) => {
          dispatch({ type: "noshowAddCategory" });
          dispatch({ type: "addCategory", value: tab.title });
        }}

      >
      </Tabs>
        <div
          style={{
            display: "flex",
            float:"left",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "70vw",
            height: "100%",
            marginTop: "-10px",
            backgroundColor: "#fff",
            color: "#108ee9",
          }}
        >
          请选择左边的话题
        </div>

    </div>
  );
}
export default AddCategory;
