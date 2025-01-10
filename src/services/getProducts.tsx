import { SetStateAction, useContext } from "react"
import { Context } from "../context/Context"
import { useQuery } from "@tanstack/react-query"
import { instance } from "../hooks/instance"
import { ProductType } from "../types/ProductType"
import { MoreOutlined } from "@ant-design/icons"

const getProducts = (name: string | null, setIsLoading: React.Dispatch<SetStateAction<boolean>>, category: string | null) => {
    const { token } = useContext(Context)
    const params = { page: 1, limit: 1000, name, category }

    const {data: Products = []} = useQuery({
        queryKey: ['products', name, category],
        queryFn: () => instance().get("/products", {
            headers: {Authorization: `Bearer ${token}`},
            params
        }).then(res => {
            return res.data?.products.map((item: ProductType, index: number) => {
                item.key = index + 1
                item.short_description = <p className="line-clamp-1">{item.short_description}</p>
                item.cost = `$${item.cost}`
                item.action = <div>
                    <button><MoreOutlined className="scale-[1.5] rotate-90"/></button>
                </div>
                return item
            })
        }).finally(() => {
            setIsLoading(false)
        })
    })

    return Products
}

export default getProducts