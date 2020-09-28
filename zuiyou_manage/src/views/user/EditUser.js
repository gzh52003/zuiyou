import React, { useEffect } from "react";
import "../scss/editUser.scss";
import {
  Table,
  Tag,
  Space,
  Input,
  Popconfirm,
  Select,
  Avatar,
  Button,
  Statistic,
} from "antd";
import { createFromIconfontCN } from "@ant-design/icons";
import checklocation from "../../utils/common";
import { useHistory } from "react-router-dom";
const { Search } = Input;
const { Option } = Select;

const MyIcon = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1608522_0jsq0eqllha.js", // 在 iconfont.cn 上生成
});

document.title = "用户管理";
const columns = [
  {
    title: "",
    dataIndex: "name",
    key: "name",
    render: () => (
      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    ),
    width: "4%",
  },
  {
    title: "用户名",
    dataIndex: "name",
    key: "name",
    render: (text) => <i>{text}</i>,
    width: "15%",
  },
  {
    title: "性别",
    dataIndex: "gender",
    key: "name",
    align: "center",
    render: (text) =>
      text === "male" ? (
        <MyIcon type="icon-nan" style={{ fontSize: 24, color: "Blue" }} />
      ) : (
        <MyIcon type="icon-ziyuan" style={{ fontSize: 20, color: "Red" }} />
      ),
    width: "8%",
  },
  {
    title: "年龄",
    align: "center",
    dataIndex: "age",
    key: "name",
    render: (text) => <p className="v_txt_align">{text}</p>,
    width: "8%",
  },
  {
    title: "状态",
    key: "tags",
    align: "center",
    dataIndex: "tags",
    width: "8%",
    render: (tags) => (
      <>
        {tags.map((tag) => {
          let color = tag === "disable" ? "red" : "green";
          if (tag === "close") {
            color = "#666";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "注册时间",
    dataIndex: "age",
    align: "center",
    key: "age",
  },
  {
    title: "违规情况",
    dataIndex: "address",
    align: "center",
    key: "address",
    render: () => <Statistic title="月内违规次数" value={0} suffix="/ 10" />,
  },
  {
    title: "操作",
    key: "action",
    render: () => (
      <Space size="middle">
        <Select defaultValue="封停账户" style={{ width: 100 }} bordered={true}>
          <Option value="1">封停1天</Option>
          <Option value="3">封停3天</Option>
          <Option value="7">封停7天</Option>
        </Select>
        <Popconfirm title=" 确定关停此账号 ？" okText="Yes" cancelText="No">
          <Button type="primary" danger>
            永久封停
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    gender: "female",
    address: "New York No. 1 Lake Park",
    tags: ["disable"],
  },
  {
    key: "2",
    name: "Jim Green",
    gender: "female",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["close"],
  },
  {
    key: "3",
    gender: "male",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["normal"],
  },
];
export default function EditUser() {
  let history = useHistory();
  useEffect(() => {
    async function fetchData() {
      let code = await checklocation(history);
      // ...
      console.log("code", code);
      if (code != localStorage.getItem("code")) {
        history.push("/login");
        localStorage.clear();
      }
    }
    fetchData();
  });
  return (
    <>
      <Search
        placeholder="Search by name"
        onSearch={(value) => console.log(value)}
        enterButton
      />
      <Table
        columns={columns}
        dataSource={data}
        className="userTab"
        bordered={true}
        scroll={{ y: 650 }}
        pagination={false}
      />
    </>
  );
}
