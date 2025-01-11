import { useContext } from 'react'
import { Context } from '../context/Context'
import { useQuery } from '@tanstack/react-query'
import { instance } from '../hooks/instance'
import { CategoryType } from '../types/CategoryType'

const getCategories = (filter: "search" | "get") => {
    const {token} = useContext(Context)
    const {data: Categories = []} = useQuery({
        queryKey: ['categories'],
        queryFn: () => instance().get("/categories", {
            headers: {Authorization: `Bearer ${token}`},
            params: {page: 1, limit: 1000}
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
                return res.data?.categories
            }
        })
    })
  return Categories
}

export default getCategories