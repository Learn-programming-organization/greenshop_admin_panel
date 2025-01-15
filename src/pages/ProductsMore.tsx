import { useContext, useState } from "react";
import { Context } from "../context/Context";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { instance } from "../hooks/instance";
import { Button, Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import toast, { Toaster } from "react-hot-toast";

const ProductsMore = () => {
  const { id } = useParams();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { token } = useContext(Context);
  const navigate = useNavigate();

  const { data: productsMore = {} } = useQuery({
    queryKey: ["productsMore"],
    queryFn: () =>
      instance()
        .get(`/product/${id}`)
        .then((res) => res.data),
  });

  const deleteMutation = useMutation({
    mutationFn: () =>
      instance().delete(`/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      setDeleteModal(false);
      toast.success("Successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setTimeout(() => navigate(-1), 300);
    },
  });

  return (
    <div>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="px-5 py-[22.1px] border-b-2 border-[#46A358]">
        <div className="flex items-end justify-between">
          <h2 className="font-bold text-2xl">{productsMore?.product_name}</h2>
          <div className="space-x-5">
            <Button
              onClick={() => setDeleteModal(true)}
              className="!bg-red-500 text-white border-transparent hover:!bg-transparent hover:!text-red-500 hover:!border-red-500"
              size="large"
              icon={<DeleteOutlined />}
            />
            <Button
              onClick={() => navigate("edit")}
              className="!bg-sky-500 text-white border-transparent hover:!bg-transparent hover:!text-sky-500 hover:!border-sky-500"
              size="large"
              icon={<EditOutlined />}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between p-5">
        <ul className="w-[49%] border-2 border-slate-400 p-5 rounded-md space-y-5">
          <li className="flex flex-col">
            <span className="text-base text-slate-400">ID</span>
            <strong>{productsMore.product_id}</strong>
          </li>
          <li className="flex flex-col">
            <span className="text-base text-slate-400">Product name</span>
            <strong>{productsMore.product_name}</strong>
          </li>
          <li className="flex flex-col">
            <span className="text-base text-slate-400">
              Product description
            </span>
            <strong>{productsMore.product_description}</strong>
          </li>
          <li className="flex flex-col">
            <span className="text-base text-slate-400">
              Product short-description
            </span>
            <strong>{productsMore.short_description}</strong>
          </li>
        </ul>
        <ul className="w-[49%] border-2 border-slate-400 p-5 rounded-md">
          <li className="flex flex-col">
            <span className="text-base text-slate-400">Product price</span>
            <strong>${productsMore.cost}</strong>
          </li>
          <li className="flex flex-col">
            <span className="text-base text-slate-400">Product discount</span>
            <strong>${productsMore.discount}</strong>
          </li>
          <li className="flex flex-col">
            <span className="text-base text-slate-400">
              Product count
            </span>
            <strong>{productsMore.count}</strong>
          </li>
          <li className="flex flex-col">
            <span className="text-base text-slate-400">
              Product status
            </span>
            <strong>{productsMore.product_status}</strong>
          </li>
          <li className="flex flex-col">
            <span className="text-base text-slate-400">
              Product size
            </span>
            <div className="flex items-center gap-5">
                {productsMore.size?.map((item: string, index: number) => <Button key={index} type="dashed">{item}</Button>)}
            </div>
          </li>
          <li className="flex flex-col">
            <span className="text-base text-slate-400">
              Product tags
            </span>
            <div className="flex items-center gap-5">
                {productsMore.tags?.map((item: string, index: number) => <Button key={index} type="dashed">{item}</Button>)}
            </div>
          </li>
        </ul>
      </div>
      <div className="border-2 w-[400px] mx-auto border-slate-300 rounded-md">
        <img src={productsMore.image_url ? productsMore.image_url[0] : "/default-featured-image.jpg"} alt="product image" width={400} height={400}/>
      </div>

      <Modal open={deleteModal} onCancel={() => setDeleteModal(false)} onOk={() => deleteMutation.mutate()}>
        <h2 className="font-bold text-center text-2xl">Are you sure to delete this product ?</h2>
      </Modal>
    </div>
  );
};

export default ProductsMore;
