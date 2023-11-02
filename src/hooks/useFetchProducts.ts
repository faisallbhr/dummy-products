import { useState, useEffect } from "react"
import { axiosInstance } from "../lib/axios"
import { ProductsProps } from "../lib/interfaces"

export const useFetchProducts = () => {
    const [products, setProducts] = useState<ProductsProps[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchProducts = async () => {
        try {
            const res = await axiosInstance.get('/products')
            setProducts(res.data.products)
            setIsLoading(false)
        } catch (err: any) {
            console.log(err.response.data)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return {
        data: products,
        isLoading
    }
}