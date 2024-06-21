import { useState } from 'react';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components';
import { cn } from '@/lib/utils';

interface DataTableProps<TData, TValue> {
  bordered?: boolean;
  className?: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  fixedFirstColumn?: boolean;
  fixedLastColumn?: boolean;
}

export function DataTable<TData, TValue>({
  bordered = false,
  className,
  columns,
  data,
  fixedFirstColumn = false,
  fixedLastColumn = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <>
      <div className={cn('rounded-md border overflow-hidden', className)}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} className="bg-white">
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        'bg-inherit',
                        bordered && 'border-x first:border-l-0 last:border-r-0',
                        fixedFirstColumn &&
                          'first:sticky first:left-0 first:shadow-[inset_-4px_0_0_hsl(var(--border))]',
                        fixedLastColumn &&
                          'last:sticky last:right-0 last:shadow-[inset_4px_0_0_hsl(var(--border))]'
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  className="bg-white"
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        'min-w-20 bg-inherit break-words',
                        bordered && 'border-x first:border-l-0 last:border-r-0',
                        fixedFirstColumn &&
                          'first:sticky first:left-0 first:shadow-[inset_-4px_0_0_hsl(var(--border))]',
                        fixedLastColumn &&
                          'last:sticky last:right-0 last:shadow-[inset_4px_0_0_hsl(var(--border))]'
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {data.length > 10 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
}
