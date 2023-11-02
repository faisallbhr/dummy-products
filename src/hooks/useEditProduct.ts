import { useState } from "react"
import { axiosInstance } from "../lib/axios"
import { ProductsProps } from "../lib/interfaces"

export const useEditProduct = () => {
    const [isLoading, setIsLoading] = useState(false)
    const editProduct = async (body: ProductsProps) => {
        const newBody = JSON.stringify(body)
        try {
            setIsLoading(true)
            const res = await axiosInstance.put(`/products/${body.id}`, newBody)
            console.log(res)
            setIsLoading(false)
        } catch (err: any) {
            console.log(err.response.data)
        }
    }

    return {
        data: editProduct,
        isLoading

    }
}