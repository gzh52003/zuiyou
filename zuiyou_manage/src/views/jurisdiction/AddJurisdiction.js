import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Table,
  Tag,
  Space,
} from "antd";
import checklocation from "../../utils/common";
import { useHistory } from "react-router-dom";
import { get, post, put, remove } from "../../utils/request";
import "../scss/AddJueisdiction.scss";
import { useForm } from "antd/lib/form/Form";
document.title = "申请权限";
const FormSizeDemo = () => {
  const columns = [
    {
      title: "用户名",
      dataIndex: "manageName",
      key: "manageName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "申请权限",
      dataIndex: "changeType",
      key: "changeType",
      render: (changeType) => {
        let type = changeType == "admin" ? "管理员" : "审评员";
        return <td class="ant-table-cell">{type}</td>;
      },
    },
    {
      title: "原因",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "是否通过",
      dataIndex: "ispass",
      key: "ispass",
    },
    {
      title: "状态",
      key: "tags",
      dataIndex: "tags",
      render: (tags, record) => {
        let color = tags == "true" ? "geekblue" : "volcano";
        console.log("状态中的record", record);
        return (
          <Tag color={color} key={tags}>
            {tags == "true" ? "已审核" : "未审核"}
          </Tag>
        );
      },
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => {
        if (record.runtype == "false") {
          return (
            <Space size="middle">
              <a>
                <Button onClick={() => accept(record)} type="primary">
                  批准
                </Button>
              </a>
              <a>
                <Button onClick={() => reject(record)} type="danger">
                  拒绝
                </Button>
              </a>
            </Space>
          );
        } else {
          return <span>已完成</span>;
        }
      },
    },
  ];

  // let data = [
  //   {
  //     key: "1",
  //     name: "John Brown",
  //     age: 32,
  //     address: "New York No. 1 Lake Park",
  //     tags: ["nice", "developer"],
  //   },
  //   {
  //     key: "2",
  //     name: "Jim Green",
  //     age: 42,
  //     address: "London No. 1 Lake Park",
  //     tags: ["loser"],
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sidney No. 1 Lake Park",
  //     tags: ["cool"],
  //   },
  // ];
  const [componentSize, setComponentSize] = useState("default");
  const [data, setData] = useState();
  let history = useHistory();
  useEffect(() => {
    async function fetchData() {
      // You can await here
      let code = await checklocation(history);
      // ...
      if (code != window.localStorage.getItem("code")) {
        history.push("/login");
        window.localStorage.clear();
      }
      if (
        localStorage.getItem("manageType") == "dc35c37bd080e881fd874845603f609c"
      ) {
        let result = await get("/changemanageType");
        console.log("result", result);
        result.map((item, index) => {
          item.key = index + 1;
          if (item.ispass == "") {
            item.ispass = "待审核";
          }
          return item;
        });
        console.log("result", result);

        setData(result);
        console.log(data);
        return;
      } else {
        let username = localStorage.getItem("manageName");
      }
    }
    fetchData();
  }, []);
  // 批准
  const accept = async (val) => {
    let { manageName, changeType, _id, reason } = val;
    console.log(val, changeType, _id);
    let result = await get("/manageInfo/find", {
      manageName,
    });
    console.log(result);
    if (result.code == 0) {
      let total = await put("/manageInfo", {
        _id: result._id,
        manageName,
        manageType: changeType,
      });
      if (total.code == 200) {
        let finally_ajax = await put("/changemanageType", {
          _id,
          manageName,
          tags: "true",
          runtype: "true",
          changeType,
          reason,
          ispass: "✔",
        });
        if (finally_ajax.code == 200) {
          setData(
            data.map((item) => {
              if (item._id == _id) {
                item.tags = "true";
                item.runtype = "true";
                item.ispass = "✔";
              }
              return item;
            })
          );
        }
      }
    }
  };
  // 拒绝
  const reject = async (val) => {
    let { manageName, changeType, _id, reason, tags, runtype, ispass } = val;
    let result = await put("/changemanageType", {
      _id,
      manageName,
      tags: "true",
      runtype: "true",
      changeType,
      reason,
      ispass: "❌",
    });
    if (result.code == 200) {
      setData(
        data.map((item) => {
          if (item._id == _id) {
            item.tags = "true";
            item.runtype = "true";
            item.ispass = "❌";
          }
          return item;
        })
      );
    }
  };
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const onFinish = async (values) => {
    console.log(values);
    let _id;
    let manageName = localStorage.getItem("manageName");
    console.log(typeof manageName);
    let { changeType, reason } = values;
    if (manageName && changeType && reason) {
      let result = await get("/changemanageType/find", { manageName });
      console.log("查询得到id", result);
      localStorage.setItem("_id", result._id);
      _id = localStorage.getItem("_id", result._id);
      if (result.code == 0) {
        let result = await put("/changemanageType", {
          _id,
          manageName,
          changeType,
          reason,
          tags: "false",
          runtype: "false",
          ispass: "待审核",
        });
        console.log("已经存在", result);
        if (result.code == 200) {
          alert("已经通知相关人员进行处理,请耐心等待");
        } else {
          alert("权限申请失败");
        }
      } else {
        console.log("进来post中");

        let result = await post("/changemanageType", {
          manageName,
          changeType,
          reason,
          tags: "false",
          runtype: "false",
          ispass: "待审核",
        });
        console.log("未存在", result);
        if (result.code == 200) {
          alert("已经通知相关人员进行处理,请耐心等待");
        } else {
          alert("权限申请失败");
        }
      }
    }
  };

  return (
    <>
      {localStorage.getItem("manageType") ==
      "dc35c37bd080e881fd874845603f609c" ? (
        <Table columns={columns} dataSource={data} />
      ) : (
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          className="login-form"
          layout="horizontal"
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          onFinish={onFinish}
        >
          <Form.Item label="表单大小" name="size">
            <Radio.Group>
              <Radio.Button value="small">小</Radio.Button>
              <Radio.Button value="default">默认</Radio.Button>
              <Radio.Button value="large">大</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="申请权限" name="changeType">
            <Select>
              <Select.Option value="vip">审评员</Select.Option>
              <Select.Option value="admin">管理员</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="权限申请原因:" name="reason">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button>取消</Button>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              提交
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};
export default function AddJurisdiction() {
  return <FormSizeDemo />;
}
