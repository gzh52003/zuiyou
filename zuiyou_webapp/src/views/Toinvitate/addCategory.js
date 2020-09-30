import React, { useState, useContext, useEffect } from "react";
import { Tabs, WhiteSpace, Badge, Button } from "antd-mobile";
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
  // dispatch({type:"addCategory",value:""})
  // let wenben = document.getElementsByClassName("am-tabs-default-bar-underline");
  let result;
  // function changCate(tab, index) {
  //   console.log("我点击进来了", tab, index);

  //   // wenben[0].style.top = index * 8 + "% !important";
  //   // console.log("wenben[0].style.top", wenben[0].style.top);
  //   // console.log("wenben", wenben[0].style);
  //   // Object.assign(wenben[0].style, {
  //   //   top: index * 8 + "%",
  //   // });
  //   dispatch({ type: "addCategory", value: tab.title });
  //   result = tab.title;
  // }
  // const [res, setData] = useState([]);
  // useEffect(() => {
  //   console.log("我便换了");
  //   setData(result);
  // }, [res]);
  return (
    <div
      style={{ top: state.showAddCategory ? "0" : "100%" }}
      className="add-category"
    >
      <Tabs
        tabs={tabs}
        tabBarPosition="left"
        initialPage={1}
        usePaged={true}
        onChange={(tab, index) => {
          dispatch({ type: "noshowAddCategory" });
          dispatch({ type: "addCategory", value: tab.title });
          // console.log("onChange", index, tab);
        }}
        // onTabClick={(tab, index) => {
        //   console.log("onTabClick", index, tab);
        // }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            marginTop: "-10px",
            backgroundColor: "#fff",
            color: "#108ee9",
          }}
        >
          👈👈请选择左边的话题
        </div>
      </Tabs>
      <WhiteSpace />

      <WhiteSpace />
    </div>
  );
}
export default AddCategory;
