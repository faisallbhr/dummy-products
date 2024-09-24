import { Column, Table as ReactTable } from "@tanstack/react-table";

interface FilterProps {
  column: Column<any>;
  table: ReactTable<any>;
}

export function Filter({ column, table }: FilterProps) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);
  const columnFilterValue = column.getFilterValue() ?? "";
  const isNumberColumn = typeof firstValue === "number";

  const handleFilterChange = (value: string, index: number) => {
    column.setFilterValue((old: [number, number] = [0, 0]) => {
      const updated = [...old] as [number | undefined, number | undefined];
      updated[index] = value ? Number(value) : undefined;
      return updated;
    });
  };

  if (["id", "actions", "thumbnail"].includes(column.id)) return null;

  return (
    <>
      {!isNumberColumn ? (
        <input
          type="text"
          value={columnFilterValue as string}
          onChange={(e) => column.setFilterValue(e.target.value)}
          placeholder="Search..."
          className="px-1 my-1 border rounded w-full text-sm font-normal"
        />
      ) : (
        <div className="flex space-x-2 min-w-32 max-w-40">
          <input
            type="number"
            value={(columnFilterValue as [number, number])?.[0] ?? ""}
            onChange={(e) => handleFilterChange(e.target.value, 0)}
            placeholder="Min"
            className="px-1 my-1 border rounded w-full text-sm font-normal"
          />
          <input
            type="number"
            value={(columnFilterValue as [number, number])?.[1] ?? ""}
            onChange={(e) => handleFilterChange(e.target.value, 1)}
            placeholder="Max"
            className="px-1 my-1 border rounded w-full text-sm font-normal"
          />
        </div>
      )}
    </>
  );
}
