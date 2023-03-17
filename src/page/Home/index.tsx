import React, { useEffect, useState, useRef } from "react";
import {
  UserOutlined,
  UsergroupAddOutlined,
  UnorderedListOutlined,
  HomeOutlined,
  SettingOutlined,
  UsergroupDeleteOutlined,
  AreaChartOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Image } from "antd";
import type { MenuProps } from "antd";
import WhaleHeader from "@/component/Header";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "@/assets/whale.png";
import "./index.less";
import { useSize } from "ahooks";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  key: React.Key,
  label: React.ReactNode,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const App: React.FC = () => {
  const [menuKey, setMenuKey] = useState("/index");
  const [collapsed, setCollapsed] = useState(false);
  const [titleShow, setTitleShow] = useState(true);
  const ref = useRef(null);
  const siderSize = useSize(ref);
  const navigate = useNavigate();
  useEffect(() => {
    navigate(menuKey);
  }, [menuKey]);

  useEffect(() => {
    if (siderSize?.width === 200) {
      setTitleShow(true);
    } else {
      setTitleShow(false);
    }
  }, [siderSize]);

  const menuList = [
    getItem("/index", "首页", <HomeOutlined />),
    getItem("/system", "系统管理", <SettingOutlined />, [
      getItem("/user", "用户管理", <UserOutlined />),
      getItem("/role", "角色管理", <UsergroupAddOutlined />),
      getItem("/source", "资源管理", <UnorderedListOutlined />),
    ]),
    getItem("/monitor", "系统监控", <DesktopOutlined />, [
      getItem("/service", "服务监控", <AreaChartOutlined />),
      getItem("/online", "在线用户", <UsergroupDeleteOutlined />),
    ]),
  ];

  const toggleCollapsed = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  const menuChange: MenuProps["onClick"] = (item) => {
    setMenuKey(item.key);
  };

  const renderTitle = () => {
    if (titleShow) {
      return <div className="label">Whale-Admin</div>;
    } else {
      return <></>;
    }
  };

  return (
    <Layout>
      <Sider
        ref={ref}
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
      >
        <div className="title">
          <div className="logo">
            <Image src={logo} preview={false}></Image>
          </div>
          {renderTitle()}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[menuKey]}
          onClick={menuChange}
          items={menuList}
        />
      </Sider>
      <Layout>
        <Header>
          <WhaleHeader />
        </Header>
        <Content>
          <Outlet />
        </Content>
        <Footer>Whale-Admin ©2023 Created by Whale</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
