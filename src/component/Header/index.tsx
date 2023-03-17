import React, { useEffect, useState } from "react";
import { Button } from "antd";
import "./index.less";

interface AppPropType {}

const App: React.FC<AppPropType> = (props) => {
  return (
    <div className="header-flex">
      <div className="header-breadcrumb">首页</div>
      <div className="operation-area"></div>
    </div>
  );
};

export default App;
