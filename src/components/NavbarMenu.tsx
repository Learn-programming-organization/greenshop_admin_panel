import React from "react";
import {
  ProductOutlined,
  ProfileOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import { PATH } from "../hooks/usePath";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: <NavLink className={`text-[20px] pl-2`} to={`${PATH.products}`}>Products</NavLink>,
    key: "sub1",
    icon: <ProductOutlined className="scale-[1.5]" />,
  },
  {
    label: <NavLink className={`text-[20px] pl-2`} to={`${PATH.users}`}>Users</NavLink>,
    key: "sub2",
    icon: <UserOutlined className="scale-[1.5]" />,
  },
  {
    label: <NavLink className={`text-[20px] pl-2`} to={`${PATH.categories}`}>Categories</NavLink>,
    key: "sub3",
    icon: <ShopOutlined className="scale-[1.5]" />,
  },
  {
    label: <NavLink className={`text-[20px] pl-2`} to={`${PATH.profile}`}>Profile</NavLink>,
    key: "sub4",
    icon: <ProfileOutlined className="scale-[1.5]" />,
  },
];

const NavbarMenu: React.FC = () => {

  return (
    <Menu
      theme="dark"
      className="!w-[20%]"
      style={{width: 256}}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
};

export default NavbarMenu;
