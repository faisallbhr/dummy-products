import { useState } from "react"
import { axiosInstance } from "../lib/axios"
import { ProductsProps } from "../lib/interfaces"

export const useDeleteProduct = () => {
    const [isLoading, setIsLoading] = useState(false)
    const deleteProduct = async (body: ProductsProps) => {
        try {
            setIsLoading(true)
            const res = await axiosInstance.delete(`/products/${body.id}`)
            console.log(res)
            setIsLoading(false)
        } catch (err: any) {
            console.log(err.response.data)
        }
    }

    return {
        data: deleteProduct,
        isLoading
    }
}