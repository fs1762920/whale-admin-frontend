import React, { useEffect, useState } from "react";
import type { MenuProps } from 'antd';
import { Button, Dropdown, Avatar } from "antd";
import "./index.less";

interface AppPropType {}

const App: React.FC<AppPropType> = (props) => {

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div>修改信息</div>
      ),
    },
    {
      key: '2',
      label: (
        <div>注销</div>
      ),
    },
  ]

  return (
    <div className="header-flex">
      <div className="header-breadcrumb">首页</div>
      <div className="operation-area">
        <Dropdown overlayClassName="operation-item" menu={{items}} placement="bottomLeft">
          <Avatar className="user-avatar" size={40} src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />      
        </Dropdown>
      </div>
    </div>
  );
};

export default App;
