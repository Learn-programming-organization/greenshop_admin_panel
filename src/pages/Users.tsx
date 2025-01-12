import { TableColumnsType } from "antd";
import Caption from "../components/Caption";
import CustomTable from "../components/CustomTable";
import { UserType } from "../types/UserType";
import getUsers from "../services/getUsers";

const Users = () => {
  const columns: TableColumnsType<UserType> = [
    {
      title: "ID",
      dataIndex: "key",
    },
    {
      title: "Username",
      dataIndex: "first_name",
    },
    {
      title: "Last name",
      dataIndex: "last_name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone number",
      dataIndex: "phone_number",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const users = getUsers()

  return (
    <div>
      <Caption path="" title="Users" count={users.length} addBtnTitle="Create user" />
      <div className="p-5">
        <CustomTable columns={columns} data={users} />
      </div>
    </div>
  );
};

export default Users;
