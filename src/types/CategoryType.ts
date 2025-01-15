import { ReactNode } from "react";

export interface CategoryType {
  key: number;
  category_id: string;
  category_name: string;
  action: ReactNode
}