import React, {useState} from "react";
import { Button, Form, Input, Select, Switch, Table, Space, Modal, Popconfirm, TreeSelect } from "antd";
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
  const [searchForm] = Form.useForm();
  const [dataForm] = Form.useForm();

  const [infoModalShow, setInfoModalShow] = useState(false);
  const [infoModalTitle, setInfoModalTitle] = useState('');

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

  const sourceTypes = [
    {
      type: 1,
      typeName: '菜单'
    },
    {
      type: 2,
      typeName: '按钮'
    }
  ]

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
            <Button type="link" icon={<EditOutlined />} size="small" onClick={() => switchDataModalShow(true, 1, record)}>
              修改
            </Button>
            <Popconfirm
              title="是否删除当前资源？"
              onConfirm={() => deleteSource(record.sourceId)}
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

  const closeModal = () => {
    setInfoModalShow(false);
    resetDataForm();
  }

  const saveOrUpdate = (formData: any) => {

  }

  const deleteSource = (id: number) => {
    console.log("deleteRole: ", id)
  }

  const renderState = () => {
    let options = stateList.map((option) => {
      return { label: option.stateName, value: option.state };
    });
    return <Select options={options} placeholder="资源状态" />;
  };

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
            <Form.Item name="sourceName" label="资源名称">
              <Input placeholder="资源名称" />
            </Form.Item>
            <Form.Item name="permissionSign" label="资源标识">
              <Input placeholder="资源标识" />
            </Form.Item>
            <Form.Item name="routerPath" label="组件路由">
              <Input placeholder="组件路由" />
            </Form.Item>
            <Form.Item name="parentId" label="父资源">
              <TreeSelect
                showSearch
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="请选择父资源"
                allowClear
                treeData={sourceList}
                fieldNames= {{
                  label: 'sourceName',
                  value: 'sourceId',
                  children: 'children'
                }}
              />
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
      <div className="source-body">
        <div className="search-condition">
          <Form
            form={searchForm}
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
            <Table
              pagination={false}
              dataSource={sourceList}
              columns={columns}
              scroll={{ x: 1200 }}
            />
          </div>
        </div>
      </div>
    </>
    
  );
};

export default App;
