import React, { useState } from "react";
import getProducts from "../services/getProducts";
import getCategories from "../services/getCategories";
import { Input, Select, TableColumnsType } from "antd";
import { ProductType } from "../types/ProductType";
import debounce from "../hooks/debounce";
import Caption from "../components/Caption";
import CustomTable from "../components/CustomTable";

const Products = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [category, setCategory] = useState<string | null>(null)
  const categories = getCategories("search")
  const columns: TableColumnsType<ProductType> = [
    {
      title: "ID",
      dataIndex: "key",
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
    },
    {
      title: "Description",
      dataIndex: "short_description",
      width: "30%",
    },
    {
      title: "Status",
      dataIndex: "product_status",
    },
    {
      title: "Count",
      dataIndex: "count",
    },
    {
      title: "Cost",
      dataIndex: "cost",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ]

  const [searchName, setSearchName] = useState<string | null>(null)
  function handleSearchProducts(e: React.ChangeEvent<HTMLInputElement>) {
    setIsLoading(true)
    setSearchName(e.target.value)
    if(!e.target.value) {
      setIsLoading(false)
    }
  }

  const name = debounce(searchName, 800)

  function handleCategoryChange(a: string, b: any) {
    setCategory(b?.label)
    if(a === undefined) {
      setCategory(null)
    }
  }
  
  const products = getProducts(name, setIsLoading, category);
  
  return <div>
    <Caption path="create" title="Products" count={products.length} addBtnTitle="Create Products" />
    <div className="flex items-center gap-5 p-5">
      <Input onChange={handleSearchProducts} className="w-[350px]" size="large" placeholder="Search by name" />
      <Select
        onChange={handleCategoryChange}
        allowClear
        className="w-[350px]"
        placeholder="Choose Category"
        size="large"
        showSearch
        optionFilterProp="label"
        options={categories}
      />
    </div>
    <div className="p-5">
      <CustomTable loading={isLoading} columns={columns} data={products}/>
    </div>
  </div>;
};

export default Products;
