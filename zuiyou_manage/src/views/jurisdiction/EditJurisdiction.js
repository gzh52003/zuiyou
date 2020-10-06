import React from "react";
import { Table, Input, Button, Space, Select, Tag } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import checklocation from "../../utils/common";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { get, post, put, remove } from "../../utils/request";
const { Option } = Select;

document.title = "权限管理";
// let data = [];

// const data = [
//   {
//     key: "1",
//     name: "John Brown",
//     address: "New York No. 1 Lake Park",
//   },
//   {
//     key: "2",
//     name: "Joe Black",
//     address: "London No. 1 Lake Park",
//   },
//   {
//     key: "3",
//     name: "Jim Green",
//     address: "Sidney No. 1 Lake Park",
//   },
//   {
//     key: "4",
//     name: "Jim Red",
//     address: "London No. 2 Lake Park",
//   },
// ];

@connect((state) => ({ manage: state.managetype }))
class JuTable extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    isLoading: false,
    data: [
      // {
      //   key: "1",
      //   name: "John Brown",
      //   address: "New York No. 1 Lake Park",
      // },
      // {
      //   key: "2",
      //   name: "Joe Black",
      //   address: "London No. 1 Lake Park",
      // },
      // {
      //   key: "3",
      //   name: "Jim Green",
      //   address: "Sidney No. 1 Lake Park",
      // },
      // {
      //   key: "4",
      //   name: "Jim Red",
      //   address: "London No. 2 Lake Park",
      // },
    ],
  };
  async componentWillMount() {
    console.log(this.props);
    let code = await checklocation(this.props.history);
    console.log("this.props", this.props);
    console.log("local", window.localStorage.getItem("code"));
    console.log("code", code);
    if (
      window.localStorage.getItem("code") &&
      window.localStorage.getItem("code") == code
    ) {
      console.log("scss");
    } else {
      this.props.history.push("/login");
    }

    // let result = await get("/manageInfo").then((res) => res);
    // this.setState({
    //   data: result.map((item, index) => {
    //     item.key = index + 1 + "";
    //     item.name = item.manageName;
    //     return item;
    //   }),
    // });
  }
  async componentDidMount() {
    await get("/manageInfo").then((res) => {
      if (res != []) {
        this.setState({
          data: res.map((item, index) => {
            item.key = index + 1 + "";
            item.name = item.manageName;
            return item;
          }),
          isLoading: true,
        });
        console.log(this.state.data);
      }
    });
  }
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  // 禁用管理用户
  changeisStop = async (_id, isStop, manageName) => {
    console.log("改变状态为禁用true", _id);
    if (manageName == localStorage.getItem("manageName")) {
      alert("你无法禁用自己");
      return;
    } else if (manageName == "marlen") {
      alert("你无权限禁用Marlen");
      return;
    }
    await put("/manageInfo", { _id, isStop: !isStop }).then((res) => {
      if (res.code == 200) {
        let resdata = this.state.data.map((item) => {
          if (item._id == _id) {
            item.isStop = !isStop;
          }
          return item;
        });
        this.setState({
          data: resdata,
        });
      } else {
        alert("更改失败");
      }
    });
  };
  // 更改管理用户类型
  changeManageType = async (value, _id, manageName) => {
    console.log("value, _id, manageType", value, _id, manageName);
    if (manageName == localStorage.getItem("manageName")) {
      alert("你无法修改自己的信息");
      return;
    } else if (manageName == "marlen") {
      alert("你无权限修改Marlen的信息");
      return;
    }
    await put("/manageInfo", { _id, manageType: value }).then((res) => {
      if (res.code === 200) {
        let resdata = this.state.data.map((item) => {
          if (item._id == _id) {
            item.manageType = item.manageType == "admin" ? "vip" : "admin";
          }
          return item;
        });
        console.log(resdata);
        this.setState({
          data: resdata,
        });
      } else {
        alert("更改失败");
      }
    });
  };
  // 删除管理用户
  removeManage = async (_id, manageName) => {
    // console.log("我是删除按钮");
    if (manageName == localStorage.getItem("manageName")) {
      alert("你无法删除自己");
      return;
    } else if (manageName == "marlen") {
      alert("你无权限删除Marlen");
      return;
    }
    await remove("/manageInfo", { _id }).then((res) => {
      if (res.result.ok == 1) {
        console.log(res);
        let result = this.state.data.filter((item) => item._id !== _id);
        this.setState({
          data: result,
        });
        console.log(result);
      } else {
        alert("删除失败");
      }
    });
    await remove("/changemanageType", { manageName });
  };
  render() {
    console.log("render");
    const columns = [
      {
        title: "帐号",
        dataIndex: "name",
        key: "name",
        width: "33%",
        ...this.getColumnSearchProps("name"),
      },
      {
        title: "帐号权限",
        dataIndex: "manageType",
        key: "manageType",
        width: "33%",
        render: (manageType, manage) => (
          <>
            {/* {console.log("......manage", manage.isStop)} */}
            {manageType == "admin" ? (
              <Tag color="gold">管理者</Tag>
            ) : (
              <Tag color="blue">审评员</Tag>
            )}
            {manage.isStop == true ? <Tag color="#f50">已禁用</Tag> : ""}
          </>
        ),
        // ...this.getColumnSearchProps('address'),
      },
      {
        title: "操作",
        key: "action",
        render: (action, manage) => (
          <Space size="middle">
            <Select
              defaultValue={manage.manageType == "admin" ? "管理员" : "审评员"}
              style={{ width: 90 }}
              onChange={(value) => {
                this.changeManageType(value, manage._id, manage.name);
              }}
              // bordered={false}
            >
              <Option value="vip">审评员</Option>
              <Option value="admin">管理者</Option>
            </Select>
            {/* <Button size="small" type="primary" danger>
              {console.log("manageTypesd", manage.manageType)}
              激活
            </Button> */}
            {manage.isStop == true ? (
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  this.changeisStop(manage._id, manage.isStop, manage.name);
                }}
              >
                {console.log("manageTypesd", manage.manageType)}
                激活
              </Button>
            ) : (
              <Button
                size="small"
                type="primary"
                danger
                onClick={() => {
                  this.changeisStop(manage._id, manage.isStop, manage.name);
                }}
              >
                {console.log("manageTypesd", manage.manageType)}
                禁用
              </Button>
            )}
            <Button
              size="small"
              type="primary"
              danger
              onClick={() => {
                this.removeManage(manage._id, manage.name);
              }}
            >
              删除
            </Button>
          </Space>
        ),
      },
    ];
    return this.state.isLoading == true ? (
      <Table columns={columns} dataSource={this.state.data} />
    ) : (
      <div></div>
    );
    // return <Table columns={columns} dataSource={data} />;
  }
}
JuTable = withRouter(JuTable);
export default function EditJurisdiction() {
  return <JuTable />;
}
