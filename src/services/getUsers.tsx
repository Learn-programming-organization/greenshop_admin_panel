import { useContext } from "react"
import { Context } from "../context/Context"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { instance } from "../hooks/instance"
import { DeleteOutlined, MoreOutlined } from "@ant-design/icons"
import { UserType } from "../types/UserType"
import toast from "react-hot-toast"

const getUsers = () => {
    const { token } = useContext(Context)
    const params = { page: 1, limit: 1000 }
    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: (id: string) => instance().delete(`/user/${id}`, {
            headers: {Authorization: `Bearer ${token}`}
        }),
        onSuccess: () => {
            toast.success("Successfully deleted")
            queryClient.invalidateQueries({queryKey: ['users']})
        }
    })

    const {data: Users = []} = useQuery({
        queryKey: ['users'],
        queryFn: () => instance().get("/users", {
            headers: {Authorization: `Bearer ${token}`},
            params
        }).then(res => {
            return res.data?.user.map((item: UserType, index: number) => {
                item.key = index + 1
                item.action = <div>
                    <button><DeleteOutlined onClick={() => deleteMutation.mutate(item.id)} className="scale-[1.5] text-red-500"/></button>
                </div>
                return item
            })
        })
    })

    return Users
}

export default getUsers