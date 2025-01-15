import { useContext } from 'react'
import { Context } from '../context/Context'
import { useQuery } from '@tanstack/react-query'
import { instance } from './instance'

const useGetDataForDashboard = () => {

    const { token } = useContext(Context)
    const params = { page: 1, limit: 1000 }

    const {data: productsCount} = useQuery({
        queryKey: ['productsCount'],
        queryFn: () => instance().get("/products", {
            headers: {Authorization: `Bearer ${token}`},
            params
        }).then(res => res.data?.total_count)
    })

    const {data: categoriesCount} = useQuery({
        queryKey: ['categoriesCount'],
        queryFn: () => instance().get("/categories", {
            headers: {Authorization: `Bearer ${token}`},
            params
        }).then(res => res.data?.total_count)
    })

    const {data: usersCount} = useQuery({
        queryKey: ['usersCount'],
        queryFn: () => instance().get("/users", {
            headers: {Authorization: `Bearer ${token}`},
            params
        }).then(res => res.data?.totcal_count)
    })

    return {productsCount, categoriesCount, usersCount}
}

export default useGetDataForDashboard