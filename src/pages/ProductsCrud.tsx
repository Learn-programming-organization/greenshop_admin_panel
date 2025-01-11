import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Context } from "../context/Context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import getCategories from "../services/getCategories";
import { instance } from "../hooks/instance";
import { Button, Input, Select, Upload, UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ProductsCrud = () => {
  const { token } = useContext(Context);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const formData = new FormData();

  const categories = getCategories("search");
  const [chooseImg, setChooseImg] = useState<string | null>(null);

  const [productName, setProductName] = useState<string>("");
  const [category, setCategory] = useState<string | null>(null);
  const [cost, setCost] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [shortDescription, setShortDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [size, setSize] = useState<string[] | null>(null);
  const [tags, setTags] = useState<string[] | null>(null);

  function handleChooseImg(e: ChangeEvent<HTMLInputElement>) {
    if(e.target.files) {
        setChooseImg(URL.createObjectURL(e.target.files[0]))
        formData.append("file", e.target.files[0])
    }
  }

  const addMutation = useMutation({
    mutationFn: (data: any) =>
      instance()
        .post("/product", data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          instance().post(
            "/media/upload-photo",
            {},
            {
              params: {
                id: res.data.product_id,
                file: formData,
              },
            }
          );
        }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate(-1);
    },
  });

  function handleAddProducts(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
        category_id: category,
        cost: cost,
        count: count,
        discount: discount,
        product_description: description,
        product_name: productName,
        products_status: status,
        short_description: shortDescription,
        size: size,
        tags: tags,
    }
    addMutation.mutate(data)
  }

  const uploadProps: UploadProps = {
    name: "file",
    action:
      "http://3.125.43.204:7777/v1/media/upload-photo?id=1cbe75db-cb57-4271-9932-1ea803739488",
    headers: {
      Authorization: token as string,
    },
    onChange(info) {
      if (info.file.status === "done") {
        console.log(`${info.file.name} muvaffaqiyatli yuklandi.`);
      } else if (info.file.status === "error") {
        console.log(`${info.file.name} yuklashda xatolik yuz berdi.`);
      }
    },
  };

  return (
    <form onSubmit={handleAddProducts} className="p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">Product Create</h2>
        <Button htmlType="submit" type="primary" size="large">
          Save
        </Button>
      </div>
      <div className="flex justify-between mt-5">
        <div className="w-[49%] p-5 rounded-md border border-slate-400 space-y-2">
          <Input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter Product name"
            size="large"
          />
          <Select
            value={category}
            onChange={(e) => setCategory(e)}
            allowClear
            className="w-full"
            placeholder="Choose category"
            size="large"
            showSearch
            optionFilterProp="label"
            options={categories}
          ></Select>
          <Input
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
            placeholder="Enter Product price"
            size="large"
            type="number"
          />
          <Input
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            placeholder="Enter Product count"
            size="large"
            type="number"
          />
          <Input
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            placeholder="Enter Product discount"
            size="large"
            type="number"
          />
        </div>
        <div className="w-[49%] p-5 rounded-md border border-slate-400 space-y-2">
          <Input
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Enter Product status"
            size="large"
          />
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Product description"
            size="large"
          />
          <Input
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="Enter Product short description"
            size="large"
          />
          <Select
            mode="multiple"
            className="w-full"
            value={size}
            onChange={(e) => setSize(e)}
            placeholder="Choose size"
            allowClear
            size="large"
            showSearch
            optionFilterProp="label"
            options={[
              {
                label: "Small",
                value: "Small",
              },
              {
                label: "Medium",
                value: "Medium",
              },
              {
                label: "Large",
                value: "Large",
              },
            ]}
          />
          <Select
            mode="multiple"
            className="w-full"
            value={tags}
            onChange={(e) => setTags(e)}
            placeholder="Choose tag"
            allowClear
            size="large"
            showSearch
            optionFilterProp="label"
            options={[
              {
                label: "All Plants",
                value: "All",
              },
              {
                label: "New Arrivals",
                value: "new-arrivals",
              },
              {
                label: "Sale",
                value: "sale",
              },
            ]}
          />
        </div>
      </div>

      <div className="flex gap-10 mt-10">
        <label>
          <div className="p-2 rounded-md border-slate-400 border w-[100px] flex items-center gap-2">
            <UploadOutlined />
            <span>Upload</span>
          </div>
          <input onChange={handleChooseImg} className="hidden" type="file" />

          {/* <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Faylni yuklang</Button>
          </Upload> */}
        </label>
        <img
          src={chooseImg as string}
          alt="Choose image"
          width={400}
          height={300}
        />
      </div>
    </form>
  );
};

export default ProductsCrud;
