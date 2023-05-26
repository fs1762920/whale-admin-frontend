import React, { useEffect, useState } from "react";
import type { MenuProps } from 'antd';
import { Button, Dropdown, Avatar, Modal, Form, Input } from "antd";
import "./index.less";

interface AppPropType {}

const App: React.FC<AppPropType> = (props) => {

  const [form] = Form.useForm();
  const [modal, contextHolder] = Modal.useModal();


  const [resetPassModalShow, setResetPassModalShow] = useState(false);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div onClick={() => setResetPassModalShow(true)}>修改密码</div>
      ),
    },
    {
      key: '2',
      label: (
        <div onClick={() => logoutConfirm()}>退出登录</div>
      ),
    },
  ]

  const save = (formData: any) => {

  }

  const logoutConfirm = () => {
    modal.confirm({
      title: '是否退出登录？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => logout()
    });
  }

  const logout = () => {
    console.log("logout ... ")
  }

  const closeModal = () => {
    setResetPassModalShow(false)
    form.resetFields()
  }

  const resetForm = () => {
    form.resetFields()
  }

  return (
    <>{contextHolder}
      <Modal title="修改密码" open={resetPassModalShow} onCancel={closeModal} footer={null}>
        <Form
          form={form}
          labelAlign="right"
          layout="vertical"
          colon={false}
          onFinish={save}
        >
          <Form.Item name="originalPass" label="原密码">
            <Input type="password" placeholder="原密码" />
          </Form.Item>
          <Form.Item name="newPass" label="新密码">
            <Input type="password" placeholder="新密码" />
          </Form.Item>
          <Form.Item name="checkPass" label="重复新密码">
            <Input type="password" placeholder="重复新密码" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
            >
              保存
            </Button>
            <Button onClick={resetForm}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="header-flex">
        <div className="header-breadcrumb">首页</div>
        <div className="operation-area">
          <Dropdown overlayClassName="operation-item" menu={{items}} placement="bottomLeft">
            <Avatar className="user-avatar" size={40} src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />      
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default App;
