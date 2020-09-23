import React, { useState,useCallback,useEffect } from "react";
import { TabBar} from "antd-mobile";
import {withRouter} from "react-router-dom"
import "./App.scss";
import "antd-mobile/dist/antd-mobile.css";
import { createFromIconfontCN } from '@ant-design/icons';
const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2085648_sb234wvlnf.js', // 在 iconfont.cn 上生成
});
function Footer(props) {
    const [selectedTab, changeSelectedTab] = useState("redTab");
    const [hidden, changeHidden] = useState(false);
    const changePath=useCallback((path) => {
        props.history.push(path)
      },[])
    const [MenuData, changeData] = useState([
      {
        title: "最右",
        icon: <MyIcon type="icon--zhangyu" style={{fontSize:"22",}}/>,
        selectedIcon:<MyIcon type="icon--zhangyu" style={{fontSize:"22",color:"pink"}}/>,
        path:"/Home"
      },
      {
        title: "发现",
        icon: <MyIcon type="icon-faxian" />,
        selectedIcon:
          "https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg",
          path:"/Found"
      },
      {
        title: "消息",
        icon: <MyIcon type="icon-xiaoxi1" />,
        selectedIcon:
          "https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg",
          path:"/News"
      },
      {
        title: "我的",
        icon: <MyIcon type="icon-shouye" />,
        selectedIcon:
          "https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg",
          path:"/Mine"
      },
    ]);
    return (
        <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={hidden}
        >
          {MenuData.map((item) => {
            return (
              <TabBar.Item
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
                      
                      // background: `url(${item.selectedIcon}) center center /  21px 21px no-repeat`,
                    }}
                  />
                }
                selected={selectedTab === "blueTab"}
                // badge={1}
                onPress={changePath.bind(null,item.path)}
                data-seed="logId"
              ></TabBar.Item>
            );
          })}
  
        </TabBar>
    );
  }
  Footer= withRouter(Footer)
export default Footer
