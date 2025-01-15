import { useContext } from "react";
import { Context } from "../context/Context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { instance } from "../hooks/instance";
import { CategoryType } from "../types/CategoryType";
import toast from "react-hot-toast";
import { DeleteOutlined } from "@ant-design/icons";

export const useCategories = (filter: "search" | "get") => {
  const { token } = useContext(Context);
  const queryClient = useQueryClient();
  const params = { page: 1, limit: 1000 };

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      instance().delete(`/category/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      toast.success("Successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await instance().get("/categories", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      if (filter === "search") {
        return response.data.categories.map((item: CategoryType) => ({
          label: item.category_name,
          value: item.category_id,
        }));
      }

      return response.data?.categories.map(
        (item: CategoryType, index: number) => ({
          ...item,
          key: index + 1,
          action: (
              <DeleteOutlined
                key={index + 1}
                onClick={() => deleteMutation.mutate(item.category_id)}
                className="scale-[1.5] text-red-500"
              />
          ),
        })
      );
    },
    enabled:!!token
  });

  return {
    categories,
    isLoading,
    error,
    deleteCategory: deleteMutation.mutate,
  };
};
