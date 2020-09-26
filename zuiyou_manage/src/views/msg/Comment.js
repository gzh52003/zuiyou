import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useReducer,
} from "react";
import QueueAnim from "rc-queue-anim";
import { Table, Input } from "antd";
import "../scss/msg.scss";
import checklocation from "../../utils/common";
import { useHistory } from "react-router-dom";
export default function Invitation() {
  // let history = useHistory();
  // useEffect(() => {
  //   async function fetchData() {
  //     let code = await checklocation(history);
  //     // ...
  //     console.log("code", code);
  //     if (code !== window.localStorage.getItem("code")) {
  //       history.push("/login");
  //       window.localStorage.clear();
  //     }
  //   }
  //   fetchData();
  // });
  const initdata = [];
  for (let i = 0; i < 10; i++) {
    initdata.push({
      key: i,
      _ID: "5f6825e8f1458fffe6cbc49e",
      user_ID: `5f6825e8f1458fffe6cbc49e`,
      publicTime: "2019-11-19 16:30:40",
      category: `London${i}`,
      content:
        "My 用户ID is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
    });
  }
  const [data, setData] = useState(initdata);

  const [columns, setColumns] = useState([
    { title: "_ID", dataIndex: "_ID", key: "_ID", width: 150, ellipsis: true },
    {
      title: "用户ID",
      dataIndex: "user_ID",
      key: "user_ID",
      width: 150,
      ellipsis: true,
    },
    {
      title: "发布时间",
      dataIndex: "publicTime",
      key: "publicTime",
      width: 150,
      ellipsis: true,
    },
    {
      title: "赞过",
      dataIndex: "favor",
      key: "favor",
      width: 150,
    },
    {
      title: "操作",
      dataIndex: "",
      key: "x",
      render: () => {
        return (
          <>
            <a style={{ marginRight: "5px" }}>{"通过审核"}</a>
            <a>{"涉嫌违规"}</a>
          </>
        );
      },
    },
  ]);

  return (
    <QueueAnim
      type={["right", "left"]}
      ease={["easeOutQuart", "easeInOutQuart"]}
    >
      <Input.Search
        placeholder="input search loading default"
        loading={false}
      />

      <Table
        columns={columns}
        key="invitate"
        expandable={{
          expandedRowRender: (data) => (
            <p style={{ margin: 0 }}>{data.content}</p>
          ),
        }}
        dataSource={data}
        pagination={{ pageSize: 100 }}
        scroll={{ y: 300, x: "100vw" }}
      />
    </QueueAnim>
  );
}
