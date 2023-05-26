import React, {useState} from "react";
import { Button, Form, Input, Select, Switch, Table, Space, Popconfirm, Modal, Tree } from "antd";
import type { TreeProps } from 'antd/es/tree';
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
  const [searchForm] = Form.useForm();
  const [dataForm] = Form.useForm();
  const [distributeForm] = Form.useForm();

  const [infoModalShow, setInfoModalShow] = useState(false);
  const [infoModalTitle, setInfoModalTitle] = useState('');

  const [sourceModalShow, setSourceModalShow] = useState(false);
  const [checkedSourceIds, setCheckSourceIds] = useState([]);

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

  const sourceList = [
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
            <Button type="link" icon={<EditOutlined />} size="small" onClick={() => switchDataModalShow(true, 1, record)}>
              修改
            </Button>
            <Button type="link" icon={<UserSwitchOutlined />} size="small" onClick={() => switchSourceModalShow(true, record.roleId)}>
              分配资源
            </Button>
            <Popconfirm
              title="是否删除当前角色？"
              onConfirm={() => deleteRole(record.roleId)}
              okText="是"
              cancelText="否"
            >
              <Button type="link" icon={<DeleteOutlined />} size="small">
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  
  const switchDataModalShow = (show: boolean, model: number, formData: any) => {
    setInfoModalShow(show);
    if (model === 0) { // 新增
      setInfoModalTitle('新增角色信息')
    } else { // 修改
      setInfoModalTitle('修改角色信息')
      dataForm.setFieldsValue(formData)
    }
  }

  const switchSourceModalShow = (show: boolean, roleId: number) => {
    setSourceModalShow(show);
    if (show) {
      // 查询当前role的所有资源
    }
  }

  const closeModal = () => {
    setInfoModalShow(false);
    resetDataForm();
  }

  const saveOrUpdate = (formData: any) => {

  }

  const deleteRole = (id: number) => {
    console.log("deleteRole: ", id)
  }

  const renderState = () => {
    let options = stateList.map((option) => {
      return { label: option.stateName, value: option.state };
    });
    return <Select options={options} placeholder="角色状态" />;
  };

  const search = (formData: any) => {};

  const resetDataForm = () => {
    dataForm.resetFields()
  };

  const resetSearchForm = () => {
    searchForm.resetFields()
  };

  const checkSource: TreeProps['onCheck'] = (checkedKeys: any) => {
    setCheckSourceIds(checkedKeys)
  };
  
  return (
    <>
      <Modal title="分配资源" open={sourceModalShow} closable={true} onCancel={() => switchSourceModalShow(false, 0)} footer={null}>
        <Form
            form={distributeForm}
            labelAlign="right"
            layout="vertical"
            colon={false}
            onFinish={saveOrUpdate}
          >
            <Form.Item name="roleName">
              <Tree
                checkable
                defaultExpandAll={true}
                checkedKeys={checkedSourceIds}
                onCheck={checkSource}
                fieldNames={{
                  title: 'sourceName',
                  key: 'sourceId',
                  children: 'children'
                }}
                treeData={sourceList}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
              >
                保存
              </Button>
            </Form.Item>
        </Form>
      </Modal>
      <Modal title={infoModalTitle} open={infoModalShow} closable={true} onCancel={closeModal} footer={null}>
        <Form
            form={dataForm}
            labelAlign="right"
            layout="vertical"
            colon={false}
            onFinish={saveOrUpdate}
          >
            <Form.Item name="roleName" label="名称">
              <Input placeholder="角色名称" />
            </Form.Item>
            <Form.Item name="roleCode" label="标识">
              <Input placeholder="角色标识" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
              >
                保存
              </Button>
              <Button onClick={resetDataForm}>
                重置
              </Button>
            </Form.Item>
        </Form>
      </Modal>
      <div className="role-body">
        <div className="search-condition">
          <Form
            form={searchForm}
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
                <Button icon={<ReloadOutlined />} onClick={resetSearchForm}>
                  重置
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
        <div className="table-area">
          <div className="operate-btn-group">
            <Button type="dashed" icon={<PlusOutlined />} onClick = {() => switchDataModalShow(true, 0, null)}>
              新增
            </Button>
          </div>
          <div className="table-data">
            <Table dataSource={roleList} columns={columns} scroll={{ x: 1200 }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
