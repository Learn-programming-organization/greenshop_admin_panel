import { useContext } from "react"
import { Context } from "../context/Context"
import { useQuery } from "@tanstack/react-query"
import { instance } from "../hooks/instance"

const getProducts = () => {
    const { token } = useContext(Context)
    const {data: Products = []} = useQuery({
        queryKey: ['products'],
        queryFn: () => instance().get("/products", {
            headers: {Authorization: `Bearer ${token}`},
            params: {page: 1, limit: 1000}
        }).then(res => res.data?.products)
    })

    return Products
}

export default getProducts