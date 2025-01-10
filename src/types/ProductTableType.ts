import { TableColumnsType } from "antd";
import { ProductType } from "./ProductType";

export interface ProductTableType {
  columns: TableColumnsType<ProductType>;
  data: ProductType[];
  loading?: boolean;
}