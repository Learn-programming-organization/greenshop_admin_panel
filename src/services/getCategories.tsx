import { useContext } from 'react'
import { Context } from '../context/Context'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { instance } from '../hooks/instance'
import { CategoryType } from '../types/CategoryType'
import { DeleteOutlined } from '@ant-design/icons'
import toast from 'react-hot-toast'

const getCategories = (filter: "search" | "get") => {
    const {token} = useContext(Context)
    const params = { page: 1, limit: 1000 }
    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: (id: string) => instance().delete(`/category/${id}`, {
            headers: {Authorization: `Bearer ${token}`}
        }),
        onSuccess: () => {
            toast.success("Successfully deleted")
            queryClient.invalidateQueries({queryKey: ['categories']})
        }
    })

    const {data: Categories = []} = useQuery({
        queryKey: ['categories'],
        queryFn: () => instance().get("/categories", {
            headers: {Authorization: `Bearer ${token}`},
            params,
        }).then(res => {
            if(filter === "search") {
                return res.data.categories.map((item: CategoryType) => {
                    const data = {
                        label: item.category_name,
                        value: item.category_id
                    }
                    return data
                })
            }else {
                return res.data?.categories.map((item: CategoryType, index: number) => {
                    item.key = index + 1
                    item.action = <div>
                        <button><DeleteOutlined onClick={() => deleteMutation.mutate(item.category_id)} className="scale-[1.5] text-red-500"/></button>
                    </div>
                    return item
                })
            }
        })
    })
  return Categories
}

export default getCategories