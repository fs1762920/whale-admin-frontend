import React, {useState} from "react";
import { Button, Form, Input, Select, Switch, Table, Space, Modal, Popconfirm } from "antd";
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
  userId: Number;
  username: String;
  nickName: String;
  mail: String;
  phone: String;
  state: Number;
  ctime: String;
}

const App: React.FC = () => {
  const [searchForm] = Form.useForm();
  const [dataForm] = Form.useForm();

  const [infoModalShow, setInfoModalShow] = useState(false);
  const [infoModalTitle, setInfoModalTitle] = useState('');

  const stateList = [
    {
      state: 0,
      stateName: "锁定",
    },
    {
      state: 1,
      stateName: "正常",
    },
  ];

  const userList: DataType[] = [
    {
      userId: 0,
      username: "admin",
      nickName: "超管",
      mail: "fs1762920@163.com",
      phone: "17629207916",
      ctime: "2023-2-13 11:11:41",
      state: 1,
    },
    {
      userId: 1,
      username: "fs1762920",
      nickName: "玄冥神掌",
      mail: "17629207915@163.com",
      phone: "18832935638",
      ctime: "2023-2-13 11:11:41",
      state: 1,
    },
    {
      userId: 2,
      username: "zhangsanfeng",
      nickName: "张三丰",
      mail: "9893128330@163.com",
      phone: "18740670497",
      ctime: "2023-2-13 11:11:41",
      state: 1,
    },
  ];

  
  const roleList = [
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
      title: "用户账号",
      dataIndex: "username",
      key: "username",
      width: 150,
      align: "center",
    },
    {
      title: "用户名称",
      dataIndex: "nickName",
      key: "nickName",
      width: 150,
      align: "center",
    },
    {
      title: "邮箱",
      dataIndex: "mail",
      key: "mail",
      width: 240,
      align: "center",
    },
    {
      title: "手机号码",
      dataIndex: "phone",
      key: "phone",
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
            <Button type="link" icon={<EditOutlined />} size="small" onClick={() => switchDataModalShow(true, 1, record)}>
              修改
            </Button>
            <Popconfirm
              title="是否重置当前用户的密码？"
              onConfirm={() => resetPassword(record.userId)}
              okText="是"
              cancelText="否"
            >
              <Button type="link" icon={<ReloadOutlined />} size="small">
                重置密码
              </Button>
            </Popconfirm>
            <Popconfirm
              title="是否删除当前用户？"
              onConfirm={() => deleteUser(record.userId)}
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
      setInfoModalTitle('新增用户信息')
    } else { // 修改
      setInfoModalTitle('修改用户信息')
      dataForm.setFieldsValue(formData)
    }
  }

  const closeModal = () => {
    setInfoModalShow(false);
    resetDataForm();
  }

  const saveOrUpdate = (formData: any) => {

  }

  const deleteUser = (id: number) => {
    console.log("deleteUser: ", id)
  }

  const resetPassword = (id: number) => {
    console.log("resetPassword: ", id)
  }

  const renderState = () => {
    let options = stateList.map((option) => {
      return { label: option.stateName, value: option.state };
    });
    return <Select options={options} placeholder="用户状态" />;
  };

  const renderRoleSelect = () => {
    let options = roleList.map((option) => {
      return { label: option.roleName, value: option.roleId };
    })
    return <Select options={options} placeholder="角色" />;
  }

  const search = (formData: any) => {};

  const resetDataForm = () => {
    dataForm.resetFields()
  };

  const resetSearchForm = () => {
    searchForm.resetFields()
  };

  return (
    <>
      <Modal title={infoModalTitle} open={infoModalShow} closable={true} onCancel={closeModal} footer={null}>
        <Form
            form={dataForm}
            labelAlign="right"
            layout="vertical"
            colon={false}
            onFinish={saveOrUpdate}
          >
            <Form.Item name="nickName" label="名称">
              <Input placeholder="用户名称" />
            </Form.Item>
            <Form.Item name="username" label="账号">
              <Input placeholder="用户账号" />
            </Form.Item>
            <Form.Item name="password" label="密码">
              <Input placeholder="用户密码" type="password" />
            </Form.Item>
            <Form.Item name="mail" label="邮箱">
              <Input placeholder="邮箱" />
            </Form.Item>
            <Form.Item name="phone" label="手机号码">
              <Input placeholder="手机号码" />
            </Form.Item>
            <Form.Item name="roleId" label="角色">
              {renderRoleSelect()}
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
      <div className="user-body">
      <div className="search-condition">
        <Form
          form={searchForm}
          labelAlign="left"
          name="horizontal_login"
          colon={false}
          onFinish={search}
        >
          <div className="form-body">
            <Form.Item name="username" label="用户账号">
              <Input placeholder="用户账号" />
            </Form.Item>
            <Form.Item name="nickName" label="用户名称">
              <Input placeholder="用户名称" />
            </Form.Item>
            <Form.Item name="mail" label="邮箱">
              <Input placeholder="邮箱" />
            </Form.Item>
            <Form.Item name="phone" label="手机号码">
              <Input placeholder="手机号码" />
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
          <Table dataSource={userList} columns={columns} scroll={{ x: 1200 }} />
        </div>
      </div>
    </div>
    </>
    
  );
};

export default App;
