import { PopUpProps } from "../lib/interfaces"
import Form from "./Form"

export default function PopUp({ isOpen, onClose, form, setForm }: PopUpProps) {
    if (!isOpen) {
        return null
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-secondary opacity-75"></div>
            <div className="bg-white p-8 rounded-md shadow-lg relative z-10 w-full max-w-xl mx-4">
                <h2 className="text-lg font-bold mb-4 text-center">
                    {
                        form.id == 0 ? 'Add Product' : 'Edit Product'
                    }
                </h2>
                <Form onClose={onClose} form={form} setForm={setForm} />
            </div>
        </div>
    )
}
