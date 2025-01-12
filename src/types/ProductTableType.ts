import { TableColumnsType } from "antd";

export interface ProductTableType {
  columns: TableColumnsType<any>;
  data: any[];
  loading?: boolean;
}