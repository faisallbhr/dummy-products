import { FilterProps } from "../lib/interfaces"

export function Filter({ column, table, }: FilterProps) {
    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id)

    const columnFilterValue = column.getFilterValue()
    const isNumberColumn = typeof firstValue === 'number'

    const shouldShowSearchInput = column.id !== 'id' && column.id !== 'action'

    return (
        <>
            {!isNumberColumn && shouldShowSearchInput && (
                <input
                    type="text"
                    value={(columnFilterValue ?? '') as string}
                    onChange={e => column.setFilterValue(e.target.value)}
                    placeholder={`Search...`}
                    className="px-1 my-1 border rounded w-full text-sm font-normal"
                />
            )}
            {isNumberColumn && shouldShowSearchInput && (
                <div className="flex space-x-2">
                    <input
                        type="number"
                        value={(columnFilterValue as [number, number])?.[0] ?? ''}
                        onChange={e =>
                            column.setFilterValue((old: [number, number]) => [
                                e.target.value,
                                old?.[1],
                            ])
                        }
                        placeholder={`Min`}
                        className="px-1 my-1 border rounded w-1/2 text-sm font-normal"
                    />
                    <input
                        type="number"
                        value={(columnFilterValue as [number, number])?.[1] ?? ''}
                        onChange={e =>
                            column.setFilterValue((old: [number, number]) => [
                                old?.[0],
                                e.target.value,
                            ])
                        }
                        placeholder={`Max`}
                        className="px-1 my-1 border rounded w-1/2 text-sm font-normal"
                    />
                </div>
            )}
        </>
    )
}