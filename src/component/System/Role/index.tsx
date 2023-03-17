import React from "react";
import { Button, Form, Input, Select, Switch, Table, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  SearchOutlined,
  ReloadOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import "./index.less";

interface DataType {
  roleId: Number;
  roleName: String;
  roleCode: String;
  state: Number;
  ctime: String;
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

  const roleList: DataType[] = [
    {
      roleId: 0,
      roleName: "超级管理员",
      roleCode: "admin",
      state: 1,
      ctime: "2023-2-13 11:11:41",
    },
    {
      roleId: 1,
      roleName: "用户管理员",
      roleCode: "user_admin",
      state: 1,
      ctime: "2023-2-13 11:11:41",
    },
    {
      roleId: 2,
      roleName: "普通用户",
      roleCode: "user",
      state: 1,
      ctime: "2023-2-15 01:22:52",
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "角色名称",
      dataIndex: "roleName",
      key: "roleName",
      width: 150,
      align: "center",
    },
    {
      title: "角色编码",
      dataIndex: "roleCode",
      key: "roleCode",
      width: 150,
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
      width: 300,
      render: (record: any) => {
        return (
          <Space size="middle">
            <Button type="link" icon={<EditOutlined />} size="small">
              修改
            </Button>
            <Button type="link" icon={<UserSwitchOutlined />} size="small">
              分配资源
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
    return <Select options={options} placeholder="角色状态" />;
  };

  const search = (formData: any) => {};
  const resetForm = () => {};
  return (
    <div className="role-body">
      <div className="search-condition">
        <Form
          form={form}
          labelAlign="left"
          name="horizontal_login"
          colon={false}
          onFinish={search}
        >
          <div className="form-body">
            <Form.Item name="roleName" label="角色名称">
              <Input placeholder="角色名称" />
            </Form.Item>
            <Form.Item name="roleCode" label="角色编码">
              <Input placeholder="角色编码" />
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
          <Button type="default" icon={<EditOutlined />}>
            修改
          </Button>
          <Button type="primary" icon={<DeleteOutlined />} danger>
            删除
          </Button>
        </div>
        <div className="table-data">
          <Table dataSource={roleList} columns={columns} scroll={{ x: 1200 }} />
        </div>
      </div>
    </div>
  );
};

export default App;
