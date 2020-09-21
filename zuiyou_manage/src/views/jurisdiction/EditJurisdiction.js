import React from "react";
import { Table, Input, Button, Space ,Select,Tag} from 'antd'
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
const {Option} = Select;

document.title = "权限管理"
const data = [
  {
    key: '1',
    name: 'John Brown',
    num: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Joe Black',
    num: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Jim Green',
    num: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    num: 32,
    address: 'London No. 2 Lake Park',
  },
];

class JuTable extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
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
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
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

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const columns = [
      {
        title: '帐号',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: '加入时间',
        dataIndex: 'num',
        key: 'num',
        width: '20%',
        ...this.getColumnSearchProps('age'),
      },
      {
        title: '评审贡献',
        dataIndex: 'num',
        key: 'num',
        width: '20%',
        ...this.getColumnSearchProps('age'),
      },
      {
        title: '帐号权限',
        dataIndex: 'address',
        key: 'address',
        width: '20%',
        render:()=>(
          <>
            <Tag color="gold">管理者</Tag>
            <Tag color="blue">审评员</Tag>
            <Tag color="#ccc">禁用</Tag>
          </>
        ),
        // ...this.getColumnSearchProps('address'),
      },
      {
        title: '操作',
        key: 'action',
        render: () => (
          <Space size="middle">
            <Select defaultValue="spy" style={{ width: 90 }} bordered={false}>
              <Option value="spy">审评员</Option>
              <Option value="glz">管理者</Option>
            </Select>
            <Button size='small' danger>禁用</Button>
          </Space>
        ),
      },
    ];
    return <Table columns={columns} dataSource={data} />;
  }
}
export default function EditJurisdiction() {
  return <JuTable />;
}
