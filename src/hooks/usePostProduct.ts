import { useState } from "react"
import { axiosInstance } from "../lib/axios"
import { ProductsProps } from "../lib/interfaces"

export const usePostProduct = () => {
    const [isLoading, setIsLoading] = useState(false)
    const postProduct = async (body: ProductsProps) => {
        try {
            setIsLoading(true)
            const res = await axiosInstance.post('/products/add', body)
            console.log(res)
            setIsLoading(false)
        } catch (err: any) {
            console.log(err.response.data)
        }
    }

    return {
        data: postProduct,
        isLoading
    }
}