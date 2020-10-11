import React, { useState, useEffect } from "react";
import { Card } from "antd-mobile";
import { invitateFromEnder } from "../utils/axios";
import Item from "antd-mobile/lib/popover/Item";
export default function () {
  const [data, setData] = useState();
  const [rendersuccess, setrendersuccess] = useState();
  var mapsuccessdata;
  let res = useEffect(() => {
    async function fetchData() {
      // You can await here
      const result = await invitateFromEnder();
      console.log(result);
      if (result.data.data !== []) {
        console.log("我进来了成功处", 1);
        setData(result.data.data);
        console.log(data);
      } else {
        console.log("请求失败");
      }
      //   return result;
      // ...
    }
    fetchData();
    //   console.log
  }, []);

  useEffect(() => {
    if (data) {
      mapsuccessdata = datamap(data);
      console.log(mapsuccessdata);
      let result = datarender(mapsuccessdata);
      console.log("result", result);
      setrendersuccess(result);
    }
  }, [data]);
  let datamap = (data) => {
    if (data) {
      let mapdata = data.map((item, index) => {
        if (item.content.mediaMes) {
          item.render = (
            <Card full key={item._id}>
              <Card.Header
                title={item._id}
                thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                //   extra={<span>this is extra</span>}
              />
              <Card.Body>
                <div>{item.content.context}</div>
                <video src={item.content.mediaMes}>
                  This is content of `Card`
                </video>
              </Card.Body>
              <Card.Footer
                content="footer content"
                extra={<div>extra footer content</div>}
              />
            </Card>
          );
        } else if (item.content.imgMes) {
          item.render = (
            <Card full key={item._id}>
              <Card.Header
                title={item._id}
                thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                //   extra={<span>this is extra</span>}
              />
              <Card.Body>
                <div>{item.content.context}</div>
                {item.content.imgMes.map((allitemimg) => (
                  <img src={allitemimg} key={allitemimg}></img>
                ))}
              </Card.Body>
              <Card.Footer
                content="footer content"
                extra={<div>extra footer content</div>}
              />
            </Card>
          );
        } else {
          item.render = (
            <Card full key={item._id}>
              <Card.Header
                title={item._id}
                thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                //   extra={<span>this is extra</span>}
              />
              <Card.Body>
                <div>{item.content.context}</div>
              </Card.Body>
              <Card.Footer
                content="footer content"
                extra={<div>extra footer content</div>}
              />
            </Card>
          );
        }
        // return ;
        return item;
      });

      return mapdata;
    }
  };
  const datarender = (data) => {
    console.log("data", data);
    let list = [];
    if (data) {
      let rdrdata = data.map((item) => {
        // return ;
        return item.render;
        //   return list;
      });
      console.log("rdrdata", rdrdata);
      return rdrdata;
    }
  };
  console.log("data", data);

  const clickgetinvitate = () => {
    console.log("我被点击了");
    setData([1, 2, 3]);
    console.log(data);
    const result = invitateFromEnder();
    // console.log(result);
    // console.log(invitateFromEnder);
  };
  return (
    <div>
      {/* <Card full>
        <Card.Header
          title="This is title"
          thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
          //   extra={<span>this is extra</span>}
        />
        <Card.Body>
          <div>This is content of `Card`</div>
        </Card.Body>
        <Card.Footer
          content="footer content"
          extra={<div>extra footer content</div>}
        />
      </Card> */}
      <div>{rendersuccess ? rendersuccess.map((item) => item) : ""}</div>
      <div></div>
      <button onClick={() => clickgetinvitate()}>点击获取</button>
    </div>
  );
}
