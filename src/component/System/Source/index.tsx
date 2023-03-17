import React from "react";
import { Button, Form, Input, Select, Switch, Table, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  SearchOutlined,
  ReloadOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "./index.less";

interface DataType {
  key: Number;
  sourceId: Number;
  sourceName: String;
  sort: Number;
  permissionSign?: String;
  routerPath?: String;
  state: Number;
  ctime: String;
  sourceType: Number;
  children?: DataType[];
}

const App: React.FC = () => {
  const [form] = Form.useForm();

  const stateList = [
    {
      state: 1,
      stateName: "正常",
    },
    {
      state: 0,
      stateName: "锁定",
    },
  ];

  const sourceList: DataType[] = [
    {
      key: 0,
      sourceId: 0,
      sourceName: "系统管理",
      sort: 0,
      ctime: "2023-2-13 11:11:41",
      state: 1,
      sourceType: 0,
      children: [
        {
          key: 1,
          sourceId: 1,
          sourceName: "用户管理",
          sort: 0,
          permissionSign: "sys:user.list",
          routerPath: "/user",
          ctime: "2023-2-13 11:11:41",
          state: 1,
          sourceType: 1,
          children: [
            {
              key: 2,
              sourceId: 2,
              sourceName: "用户新增",
              sort: 0,
              permissionSign: "sys:user.add",
              ctime: "2023-2-13 11:11:41",
              state: 1,
              sourceType: 2,
            },
            {
              key: 3,
              sourceId: 3,
              sourceName: "用户修改",
              sort: 1,
              permissionSign: "sys:user.update",
              ctime: "2023-2-13 11:11:41",
              state: 1,
              sourceType: 2,
            },
            {
              key: 4,
              sourceId: 4,
              sourceName: "用户删除",
              sort: 2,
              permissionSign: "sys:user.update",
              ctime: "2023-2-13 11:11:41",
              state: 1,
              sourceType: 2,
            },
            {
              key: 5,
              sourceId: 5,
              sourceName: "用户查询",
              sort: 3,
              permissionSign: "sys:user.query",
              ctime: "2023-2-13 11:11:41",
              state: 1,
              sourceType: 2,
            },
          ],
        },
        {
          key: 6,
          sourceId: 6,
          sourceName: "角色管理",
          sort: 1,
          permissionSign: "sys:role.list",
          routerPath: "/role",
          ctime: "2023-2-13 11:11:41",
          state: 1,
          sourceType: 0,
          children: [
            {
              key: 7,
              sourceId: 7,
              sourceName: "角色新增",
              sort: 0,
              permissionSign: "sys:role.add",
              ctime: "2023-2-13 11:11:41",
              state: 1,
              sourceType: 2,
            },
            {
              key: 8,
              sourceId: 8,
              sourceName: "角色修改",
              sort: 1,
              permissionSign: "sys:role.update",
              ctime: "2023-2-13 11:11:41",
              state: 1,
              sourceType: 2,
            },
            {
              key: 9,
              sourceId: 9,
              sourceName: "角色删除",
              sort: 2,
              permissionSign: "sys:role.update",
              ctime: "2023-2-13 11:11:41",
              state: 1,
              sourceType: 2,
            },
            {
              key: 10,
              sourceId: 10,
              sourceName: "角色查询",
              sort: 3,
              permissionSign: "sys:role.query",
              ctime: "2023-2-13 11:11:41",
              state: 1,
              sourceType: 2,
            },
          ],
        },
      ],
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "资源名称",
      dataIndex: "sourceName",
      key: "sourceName",
      width: 150,
      align: "center",
    },
    {
      title: "排序",
      dataIndex: "sort",
      key: "sort",
      width: 100,
      align: "center",
    },
    {
      title: "权限标识",
      dataIndex: "permissionSign",
      key: "permissionSign",
      width: 240,
      align: "center",
    },
    {
      title: "组件路径",
      dataIndex: "routerPath",
      key: "routerPath",
      width: 200,
      align: "center",
    },
    {
      title: "状态",
      dataIndex: "state",
      key: "state",
      width: 100,
      align: "center",
      render: (state: Number) => {
        return <Switch checked={state === 1} />;
      },
    },
    {
      title: "创建时间",
      dataIndex: "ctime",
      key: "ctime",
      width: 240,
      align: "center",
    },
    {
      title: "操作",
      key: "action",
      fixed: "right",
      align: "center",
      width: 400,
      render: (record: any) => {
        return (
          <Space size="middle">
            <Button type="link" icon={<EditOutlined />} size="small">
              修改
            </Button>
            <Button type="link" icon={<DeleteOutlined />} size="small">
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  const renderState = () => {
    let options = stateList.map((option) => {
      return { label: option.stateName, value: option.state };
    });
    return <Select options={options} placeholder="资源状态" />;
  };

  const search = (formData: any) => {};
  const resetForm = () => {};
  return (
    <div className="source-body">
      <div className="search-condition">
        <Form
          form={form}
          labelAlign="left"
          name="horizontal_login"
          colon={false}
          onFinish={search}
        >
          <div className="form-body">
            <Form.Item name="sourceName" label="资源名称">
              <Input placeholder="资源名称" />
            </Form.Item>
            <Form.Item name="state" label="状态">
              {renderState()}
            </Form.Item>
          </div>
          <div className="form-footer">
            <Form.Item>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                htmlType="submit"
              >
                查询
              </Button>
              <Button icon={<ReloadOutlined />} onClick={resetForm}>
                重置
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
      <div className="table-area">
        <div className="operate-btn-group">
          <Button type="dashed" icon={<PlusOutlined />}>
            新增
          </Button>
        </div>
        <div className="table-data">
          <Table
            pagination={false}
            dataSource={sourceList}
            columns={columns}
            scroll={{ x: 1200 }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
