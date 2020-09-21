import React from "react";
import '../scss/editUser.scss'
import { Table, Tag, Space, Input, Popconfirm, Select, Button } from 'antd';
const { Search } = Input;
const { Option } = Select;


document.title = "用户管理"
const columns = [
  {
    title: '用户名',
    dataIndex: 'name',
    key: 'name',
    render: text => <i>{text}</i>,
    width: '20%',
  },
  {
    title: '注册时间',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '性别',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
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
    title: '操作',
    key: 'action',
    render: () => (
      <Space size="middle">
        <Select defaultValue="封停账户" style={{ width: 100 }} bordered={true}>
          <Option value="1">封停1天</Option>
          <Option value="3">封停3天</Option>
          <Option value="7">封停7天</Option>
        </Select>
        <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
          <Button style={{color:'red'}}>永久封停</Button>
        </Popconfirm>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
export default function EditUser() {
  return (
    <>
      <Search placeholder="Search by name" onSearch={value => console.log(value)} enterButton />
      <Table columns={columns} dataSource={data} className="userTab" />
    </>
  );
}
