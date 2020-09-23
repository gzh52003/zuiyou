/* eslint-disable no-func-assign */
import React, { useState, useCallback, useContext } from "react";
import { TabBar } from "antd-mobile";
import { withRouter } from "react-router-dom"
import { GlobalContext } from './store/index'
import "./App.scss";
import "antd-mobile/dist/antd-mobile.css";
import { createFromIconfontCN } from '@ant-design/icons';
const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2085648_xnxr2z1tpg.js', 
});
let isSel = ""
function Footer(props) {
  const { dispatch } = useContext(GlobalContext);
  const [selectedTab, changeSelectedTab] = useState("redTab");
  const changePath = useCallback((path) => {
    props.history.push(path)
  }, [])
  const [MenuData, changeData] = useState([
    {
      title: "最右",
      icon: <MyIcon type="icon--zhangyu" style={{ fontSize: "22", }} />,
      selectedIcon: <MyIcon type="icon--zhangyu-copy" />,
      path: "/Home"
    },
    {
      title: "发现",
      icon: <MyIcon type="icon-faxian" />,
      selectedIcon: <MyIcon type="icon-faxian-copy" />,
      path: "/Found"
    },
    {
      title: "",
      icon: <div style={{ width: 30, height: 30, lineHeight: '36px', borderRadius: '50%', background: '#1296db' }}><MyIcon type="icon-jia" /></div>,
      selectedIcon: <MyIcon type="icon-shouye-copy" />,
    },
    {
      title: "消息",
      icon: <MyIcon type="icon-xiaoxi1" />,
      selectedIcon: <MyIcon type="icon-xiaoxi1-copy" />,
      path: "/News"
    },
    {
      title: "我的",
      icon: <MyIcon type="icon-shouye" />,
      selectedIcon: <MyIcon type="icon-shouye-copy" />,
      path: "/Mine"
    },
  ]);
  return (
    <TabBar
      unselectedTintColor="#949494"
      tintColor="#33A3F4"
      barTintColor="white"
      >
      {MenuData.map((item) => {
        return (
          <TabBar.Item
          // selected={isSel === item.title}
          // onPress={() =>{isSel=item.title}}
            className="menu-icon"
            title={item.title}
            key={item.title}
            icon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                }}>
                {item.icon}
              </div>
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                }}>
                {item.selectedIcon}
              </div>
            }
            selected={selectedTab === "blueTab"}
            onPress={() => { item.path ? changePath(item.path) : dispatch({ type: "show" }) }}
            data-seed="logId"
          ></TabBar.Item>
        );
      })}

    </TabBar>
  );
}
Footer = withRouter(Footer)
export default Footer
