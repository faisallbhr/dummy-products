import { flexRender } from '@tanstack/react-table';
import { Filter } from './Filter';
import { TableProps } from '../lib/interfaces';



export default function Table({ table }: TableProps) {
    const columnSize: number[] = [50, 250, 200, 150, 100, 130]

    return (
        <table className='w-full'>
            <thead className='border-b'>
                {
                    table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className='border-x' style={{
                                    width: columnSize[header.index]
                                }}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    <div className='mx-3'>
                                        <Filter column={header.column} table={table} />
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))
                }
            </thead>
            <tbody>
                {
                    table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className='border-t'>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className='border-x px-4'>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}
