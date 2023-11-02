import { Dispatch, SetStateAction } from "react"
import { Column, Table as ReactTable } from "@tanstack/react-table"

export interface ProductsProps {
    id: number,
    title: string,
    brand: string,
    category: string,
    price: number
}

export interface ActionProps {
    product: ProductsProps,
    isPopupOpen: boolean,
    setPopupOpen: Dispatch<SetStateAction<boolean>>,
    setForm: Dispatch<SetStateAction<ProductsProps>>,
}

export interface ButtonProps {
    label: string,
    onClick?: () => void,
    disabled?: boolean,
    variant?: 'secondary' | 'default'
    size?: 'sm' | 'default'
    isLoading?: boolean
}

export interface FilterProps {
    column: Column<ProductsProps>,
    table: ReactTable<any>
}

export interface FormProps {
    onClose: () => void,
    form: ProductsProps,
    setForm: Dispatch<SetStateAction<ProductsProps>>,
}

export interface PopUpProps {
    isOpen: boolean,
    onClose: () => void,
    form: ProductsProps,
    setForm: Dispatch<SetStateAction<ProductsProps>>,
}

export interface TableProps {
    table: ReactTable<any>
}