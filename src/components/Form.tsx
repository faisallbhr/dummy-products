import { toast } from 'react-toastify'
import { usePostProduct } from "../hooks/usePostProduct";
import { useEditProduct } from "../hooks/useEditProduct";
import { FormProps } from "../lib/interfaces";
import Button from './Button';


export default function Form({ onClose, form, setForm }: FormProps) {
    const { data: postProduct, isLoading: isLoadingPostProduct } = usePostProduct()
    const { data: editProduct, isLoading: isLoadingEditProduct } = useEditProduct()

    const postNotif = () => toast.success("Successfully added product!", {
        theme: 'colored',
        pauseOnHover: false,
    })
    const editNotif = () => toast.info("Successfully edited product!", {
        theme: 'colored',
        pauseOnHover: false,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (form.id == 0) {
            await postProduct(form)
            postNotif()
        } else {
            await editProduct(form)
            editNotif()
        }
        onClose()
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            <div className="grid space-y-1">
                <label htmlFor="title" className="font-semibold">Name</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    value={form.title}
                    placeholder="Name"
                    className="border rounded-md px-2 py-1"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="grid space-y-1">
                <label htmlFor="brand" className="font-semibold">Brand</label>
                <input
                    id="brand"
                    name="brand"
                    type="text"
                    value={form.brand}
                    placeholder="Brand"
                    className="border rounded-md px-2 py-1"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="grid space-y-1">
                <label htmlFor="category" className="font-semibold">Category</label>
                <input
                    id="category"
                    name="category"
                    type="text"
                    value={form.category}
                    placeholder="Category"
                    className="border rounded-md px-2 py-1"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="grid space-y-1">
                <label htmlFor="price" className="font-semibold">Price</label>
                <input
                    id="price"
                    name="price"
                    type="number"
                    value={form.price}
                    placeholder="Price"
                    className="border rounded-md px-2 py-1"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="flex space-x-2 justify-end">
                <Button
                    label="Cancel"
                    onClick={onClose}
                    variant="secondary"
                />
                {
                    isLoadingPostProduct || isLoadingEditProduct ?
                        <Button
                            label="Submit"
                            disabled={true}
                            isLoading={isLoadingPostProduct || isLoadingEditProduct}
                        />
                        :
                        <Button
                            label="Submit"
                        />
                }
            </div>
        </form>
    )
}
