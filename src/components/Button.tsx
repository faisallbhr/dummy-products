import { ButtonProps } from "../lib/interfaces"

export default function Button({ label, onClick, disabled, variant, size, isLoading }: ButtonProps) {
    const getVariant = () => {
        switch (variant) {
            case 'secondary':
                return 'bg-white border text-primary hover:bg-secondary/80'
            default:
                return 'bg-primary text-white hover:bg-primary/90'
        }
    }

    const getSize = () => {
        switch (size) {
            case 'sm':
                return 'h-8 px-3'
            default:
                return 'h-10 px-4 py-2'
        }
    }
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`text-sm font-medium rounded-md disabled:pointer-events-none disabled:opacity-50 ${getVariant()} ${getSize()}`}
        >
            {
                isLoading ?
                    <div className="space-x-2 flex">
                        <div className='flex justify-center items-center'>
                            <div className='w-3 h-3 border-b border-white rounded-full animate-spin'></div>
                        </div>
                        <p>{label}</p>
                    </div>
                    :
                    label
            }
        </button>
    )
}