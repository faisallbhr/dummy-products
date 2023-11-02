import { useState } from 'react'
import { LuBadgeInfo } from 'react-icons/lu'
import Button from './Button'

export default function Information() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='flex justify-center'>
            <div onClick={() => setIsOpen(!isOpen)} className='cursor-pointer text-yellow-600'>
                <LuBadgeInfo size={30} />
            </div>
            {
                isOpen &&
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-secondary opacity-75"></div>
                    <div className="bg-white p-8 rounded-md shadow-lg relative z-10 w-full max-w-md mx-4">
                        <h3 className='text-primary font-semibold pb-2'>Information:</h3>
                        <div className='border rounded-md shadow'>
                            <div className='relative border-y p-2'>
                                <p className='text-sm'>Adding, updating and deleting products will not change the data from the server. It will simulate POST, PUT and DELETE requests.</p>
                            </div>
                            <div className='relative border-y p-2'>
                                <p className='text-sm'>You can see the response on the console.</p>
                            </div>
                            <div className='relative border-y p-2'>
                                <p className='text-sm'>Read the full API documentation <a target='_blank' href={'https://dummyjson.com/docs/products'} className='text-blue-500 underline'>here</a></p>
                            </div>
                        </div>
                        <div className='pt-4 float-right'>
                            <Button
                                label='OK'
                                onClick={() => setIsOpen(!isOpen)}
                            />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
