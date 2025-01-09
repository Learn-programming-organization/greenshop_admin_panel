import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  ProductOutlined,
  ProfileOutlined,
  SettingOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "Products",
    key: "sub1",
    icon: <ProductOutlined className="scale-[1.5]" />,
  },
  {
    label: "Users",
    key: "sub2",
    icon: <UserOutlined className="scale-[1.5]" />,
  },
  {
    label: "Categories",
    key: "sub3",
    icon: <ShopOutlined className="scale-[1.5]" />,
  },
  {
    label: "Profile",
    key: "sub4",
    icon: <ProfileOutlined className="scale-[1.5]" />,
  },
];

const NavbarMenu: React.FC = () => {
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      theme="dark"
      className="!w-[20%]"
      onClick={onClick}
      style={{width: 256}}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
};

export default NavbarMenu;
