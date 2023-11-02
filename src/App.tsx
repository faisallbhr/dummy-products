import { useFetchProducts } from './hooks/useFetchProducts';
import { useState } from 'react';
import { ColumnDef, ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { ProductsProps } from './lib/interfaces';
import Action from './components/Action';
import Information from './components/Information';
import Popup from './components/Popup';
import Table from './components/Table';
import Button from './components/Button';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { data: products, isLoading: isLoadingFetchProduct } = useFetchProducts()

  const [form, setForm] = useState({
    id: 0,
    title: '',
    brand: '',
    category: '',
    price: 0,
  })

  const columns: ColumnDef<ProductsProps>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
      cell: ({ row }) => {
        const idHeader = row.getValue('id') as React.ReactNode;
        return <div className="text-center mx-auto">{idHeader}</div>
      }
    },
    {
      header: 'Name',
      accessorKey: 'title',
      cell: ({ row }) => {
        const nameHeader = row.getValue('title') as React.ReactNode;
        return <div className="line-clamp-1">{nameHeader}</div>
      }
    },
    {
      header: 'Brand',
      accessorKey: 'brand',
      cell: ({ row }) => {
        const brandHeader = row.getValue('brand') as React.ReactNode;
        return <div className="line-clamp-1">{brandHeader}</div>
      },
    },
    {
      header: 'Category',
      accessorKey: 'category'
    },
    {
      header: 'Price',
      accessorKey: 'price',
      cell: ({ row }) => {
        const price = parseFloat(row.getValue('price'))
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(price)
        return <div>{formatted}</div>
      },
      enableColumnFilter: true
    },
    {
      header: 'Action',
      id: 'action',
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original
        return (
          <Action product={product} isPopupOpen={isPopupOpen} setPopupOpen={setPopupOpen} setForm={setForm} />
        )
      }
    }
  ]

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  })

  const [isPopupOpen, setPopupOpen] = useState(false)

  const openPopup = () => {
    setPopupOpen(true)
  }

  const closePopup = () => {
    setPopupOpen(false);
    setForm({
      id: 0,
      title: '',
      brand: '',
      category: '',
      price: 0,
    })
  }

  return (
    <div className='max-w-7xl my-10 mx-auto px-4'>
      <div className='grid justify-center space-y-2'>
        <h1 className='text-primary font-bold text-3xl'>DUMMY PRODUCTS</h1>
        <Information />
      </div>
      <div className='mx-4'>
        <ToastContainer
          autoClose={3000}
          className={'px-4'}
        />
      </div>
      <Popup
        isOpen={isPopupOpen}
        onClose={closePopup}
        form={form}
        setForm={setForm}
      />
      <div className='flex justify-end'>
        <Button
          label='Add Product'
          onClick={openPopup}
        />
      </div>
      <div className='rounded-md border my-4 shadow-sm overflow-x-auto'>
        <Table
          table={table}
        />
        {
          isLoadingFetchProduct &&
          <div className='flex justify-center my-4'>
            <div className='w-5 h-5 border-b border-black rounded-full animate-spin'></div>
          </div>
        }
      </div>
      <div className='flex items-center justify-end space-x-4 z-0'>
        <p className='text-sm font-medium'>
          Page
          <span> {table.options.state.pagination?.pageIndex != undefined && table.options.state.pagination?.pageIndex + 1} </span>
          of
          <span> {table.getPageCount()} </span>
        </p>
        <div className='flex space-x-2'>
          <Button
            label='Previous'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            variant='secondary'
            size='sm'
          />
          <Button
            label='Next'
            onClick={() => { table.nextPage() }}
            disabled={!table.getCanNextPage()}
            variant='secondary'
            size='sm'
          />
        </div>
      </div>
    </div>
  )
}

export default App
