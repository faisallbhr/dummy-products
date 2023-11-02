import { ActionProps, ProductsProps } from '../lib/interfaces';
import { useDeleteProduct } from '../hooks/useDeleteProduct';
import { toast } from 'react-toastify'
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs'


export default function Action({ product, isPopupOpen, setPopupOpen, setForm }: ActionProps) {
    const { data: deleteProduct, isLoading: isLoadingDeleteProduct } = useDeleteProduct()

    const deleteNotif = () => toast.error("Successfully deleted product!", {
        theme: 'colored',
        pauseOnHover: false,
    })

    const onEdit = (product: ProductsProps) => {
        setForm({
            id: product.id,
            title: product.title,
            brand: product.brand,
            category: product.category,
            price: product.price,
        });
        setPopupOpen(!isPopupOpen)
    }

    const handleDelete = async (product: ProductsProps) => {
        const shouldDelete = confirm(`Are you sure want to delete ${product.title}?`)
        if (!shouldDelete) {
            return null
        }
        await deleteProduct(product)
        deleteNotif()
    }

    return (
        <div className="flex space-x-4 justify-center my-2">
            <button
                onClick={() => onEdit(product)}
                className="text-sm font-medium border disabled:pointer-events-none disabled:opacity-50 bg-white text-primary hover:bg-secondary/80 h-8 px-3">
                <BsFillPencilFill />
            </button>
            <button
                onClick={() => handleDelete(product)}
                className="text-sm font-medium border disabled:pointer-events-none disabled:opacity-50 bg-white text-primary hover:bg-secondary/80 h-8 px-3">
                {
                    isLoadingDeleteProduct ?
                        <div className='flex justify-center items-center'>
                            <div className='w-3 h-3 border-b border-black rounded-full animate-spin'></div>
                        </div>
                        :
                        <BsFillTrashFill />
                }
            </button>
        </div>
    )
}
