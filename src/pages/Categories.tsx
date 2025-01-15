import { TableColumnsType } from "antd";
import Caption from "../components/Caption";
import CustomTable from "../components/CustomTable";
import { useCategories } from "../hooks/useCategories";
import { CategoryType } from "../types/CategoryType";

const Categories = () => {
  const { categories, isLoading, error } = useCategories("get");

  const columns: TableColumnsType<CategoryType> = [
    {
      title: "ID",
      dataIndex: "key",
    },
    {
      title: "Username",
      dataIndex: "category_name",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error loading categories</div>;
  }

  return (
    <div>
      <Caption
        path="create"
        title="Categories"
        count={categories.length}
        addBtnTitle="Create Category"
      />
      <div className="p-5">
        <CustomTable columns={columns} data={categories} />
      </div>
    </div>
  );
};

export default Categories;
