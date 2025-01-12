import React from "react";
import { ProductTableType } from "../types/ProductTableType";
import { Table } from "antd";
import { ProductType } from "../types/ProductType";
import { UserType } from "../types/UserType";

const CustomTable: React.FC<ProductTableType> = ({
  columns,
  data,
  loading,
}) => {
  return (
    <Table<any>
      loading={loading}
      className="border border-slate-300 rounded-md"
      columns={columns}
      dataSource={data ? data : []}
    />
  );
};

export default CustomTable;