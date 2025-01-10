import { ReactNode } from "react";

export interface ProductType {
  key: number;
  product_id?: string;
  product_name?: string;
  category_id?: string;
  short_description?: string | ReactNode;
  product_description?: string;
  product_status?: string;
  size?: string[];
  count?: number;
  cost?: number | string;
  discount?: number;
  tags?: string[];
  liked?: boolean;
  basket?: boolean;
  image_url?: string[];
  action?: ReactNode;
}