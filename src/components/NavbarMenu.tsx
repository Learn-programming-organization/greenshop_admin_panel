import React, { useState } from "react";
import {
  LogoutOutlined,
  ProductOutlined,
  ProfileOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu, Modal } from "antd";
import { NavLink } from "react-router-dom";
import { PATH } from "../hooks/usePath";
import Logo from "../assets/logoforNavbar.svg";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: (
      <NavLink
        className={`text-[20px] pl-2 !text-white font-semibold`}
        to={`${PATH.products}`}
      >
        Products
      </NavLink>
    ),
    key: "sub1",
    icon: <ProductOutlined className="scale-[1.5] !text-white" />,
  },
  {
    label: (
      <NavLink
        className={`text-[20px] pl-2 !text-white font-semibold`}
        to={`${PATH.users}`}
      >
        Users
      </NavLink>
    ),
    key: "sub2",
    icon: <UserOutlined className="scale-[1.5] !text-white" />,
  },
  {
    label: (
      <NavLink
        className={`text-[20px] pl-2 !text-white font-semibold`}
        to={`${PATH.categories}`}
      >
        Categories
      </NavLink>
    ),
    key: "sub3",
    icon: <ShopOutlined className="scale-[1.5] !text-white" />,
  },
  {
    label: (
      <NavLink
        className={`text-[20px] pl-2 !text-white font-semibold`}
        to={`${PATH.profile}`}
      >
        Profile
      </NavLink>
    ),
    key: "sub4",
    icon: <ProfileOutlined className="scale-[1.5] !text-white" />,
  },
];

const NavbarMenu: React.FC = () => {
  const [logoutModal, setLogOutModal] = useState<boolean>(false);
  function handleLogOut() {
    location.replace("/");
    localStorage.clear();
    setTimeout(() => location.reload(), 200);
  }

  return (
    <div className="!w-[20%] h-[100vh] bg-[#357b43] relative">
      <div className="p-5 border-b-[2px] border-white">
        <a href="/">
          <img src={Logo} alt="Site Logo" width={190} />
        </a>
      </div>
      <Menu
        theme="dark"
        className="bg-transparent"
        style={{ width: "100%" }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
      <Button
        onClick={() => setLogOutModal(true)}
        icon={<LogoutOutlined />}
        className="!w-full bg-[#57c36c] border-2 border-transparent text-white hover:!border-white hover:!bg-transparent hover:!text-white absolute bottom-5"
        size="large"
      >
        Log Out
      </Button>
      <Modal
        onOk={handleLogOut}
        open={logoutModal}
        onCancel={() => setLogOutModal(false)}
      >
        <h2>Are you sure Log Out ?</h2>
      </Modal>
    </div>
  );
};

export default NavbarMenu;
