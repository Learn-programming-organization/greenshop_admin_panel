import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { data, useNavigate, useParams } from "react-router-dom";
import getCategories from "../services/getCategories";
import { instance } from "../hooks/instance";
import { Button, Input, Select, Upload, UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import toast, { Toaster } from "react-hot-toast";
import default_image from "../../public/default-featured-image.jpg"

const ProductsCrud = () => {
  const { id } = useParams()

  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(Context);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const categories = getCategories("search");
  const [chooseImg, setChooseImg] = useState<string | null>(null);
  const [getImg, setGetImg] = useState<any>(null);

  const [productName, setProductName] = useState<string>("");
  const [category, setCategory] = useState<string | null>(null);
  const [cost, setCost] = useState<number | string>("");
  const [count, setCount] = useState<number | string>("");
  const [discount, setDiscount] = useState<number | string>("");
  const [description, setDescription] = useState<string>("");
  const [shortDescription, setShortDescription] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);
  const [size, setSize] = useState<string[] | null>(null);
  const [tags, setTags] = useState<string[] | null>(null);

  function handleChooseImg(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      setChooseImg(URL.createObjectURL(file));
      setGetImg(file);
    }
  }

  const addMutation = useMutation({
    mutationFn: (data: any) =>
      instance()
        .post("/product", data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const formData = new FormData();
          formData.append("file", getImg);
          instance().post("/media/upload-photo", formData, {
            params: {
              id: res.data.product_id,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }),
    onSuccess: () => {
      toast.success("Products successfully added");
      setTimeout(() => {
        setIsLoading(false);
        queryClient.invalidateQueries({ queryKey: ["products"] });
        navigate(-1);
      }, 600);
    },
  });

  const editMutation = useMutation({
    mutationFn: (data: any) => instance().put("/product", data, {
      headers: {Authorization: `Bearer ${token}`}
    }).then(() => {
      if(getImg) {
        const formData = new FormData()
        formData.append("file", getImg)
        instance().post("/media/upload-photo", formData, {
          params: {id},
          headers: {Authorization: `Bearer ${token}`}
        })
      }
    }),
    onSuccess: () => {
      toast.success("Product updated")
      setTimeout(() => {
        setIsLoading(false)
        queryClient.invalidateQueries({queryKey: ['products']})
        // location.reload()
        navigate(-1)
      }, 600)
    }
  })

  function handleAddProducts(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data: any = {
      category_id: category,
      cost: cost,
      count: count,
      discount: discount,
      product_description: description,
      product_name: productName,
      product_status: status,
      short_description: shortDescription,
      size: size,
      tags: tags,
    };
    if(id) {
      data.product_id = id
      editMutation.mutate(data)
    }
    else {
      addMutation.mutate(data);
      setIsLoading(true);
    }
  }

  useEffect(() => {
    if(id) {
      instance().get(`/product/${id}`).then(res => {
        setProductName(res.data.product_name)
        setCategory(res.data.category_id)
        setCost(res.data.cost)
        setCount(res.data.count)
        setDiscount(res.data.discount)
        setStatus(res.data.product_status)
        setDescription(res.data.product_description)
        setShortDescription(res.data.short_description)
        setSize(res.data.size)
        setTags(res.data.tags)
        setChooseImg(res.data.image_url ? res.data.image_url[0] : default_image)
      })
    }
  }, [id])

  // const uploadProps: UploadProps = {
  //   name: "file",
  //   action:
  //     "http://3.125.43.204:7777/v1/media/upload-photo?id=1cbe75db-cb57-4271-9932-1ea803739488",
  //   headers: {
  //     Authorization: token as string,
  //   },
  //   onChange(info) {
  //     if (info.file.status === "done") {
  //       console.log(`${info.file.name} muvaffaqiyatli yuklandi.`);
  //     } else if (info.file.status === "error") {
  //       console.log(`${info.file.name} yuklashda xatolik yuz berdi.`);
  //     }
  //   },
  // };

  return (
    <form onSubmit={handleAddProducts} className="p-5">
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">Product {id ? "edit" : "create"}</h2>
        <Button
          loading={isLoading}
          htmlType="submit"
          type="primary"
          size="large"
        >
          {id ? "Edit" : "Save"}
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
          />
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
          <Select
            value={status}
            onChange={(e) => setStatus(e)}
            allowClear
            className="w-full"
            placeholder="Choose status"
            size="large"
            showSearch
            optionFilterProp="label"
            options={[
              {
                label: "New Arrivals",
                value: "new-arrival",
              },
              {
                label: "Sale",
                value: "sale",
              },
            ]}
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
