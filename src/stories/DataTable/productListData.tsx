import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Switch,
} from '@/components';

type Columns = {
  id: string;
  image: string;
  name: string;
  status: string;
  price: number;
};

export const columns: ColumnDef<Columns>[] = [
  {
    header: 'Switch',
    cell: () => <Switch />,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <div className="-mx-2">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="px-2"
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      return (
        <div>
          <img
            src={row.getValue('image')}
            className="w-16 h-16"
            loading="lazy"
          />
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const value = row.getValue('status') as string;

      return (
        <div className="min-w-24">
          {value === 'Active' && <Badge>{value}</Badge>}
          {value === 'Draft' && <Badge variant="outline">{value}</Badge>}
          {value === 'Sold Out' && <Badge variant="secondary">{value}</Badge>}
        </div>
      );
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <div className="-mx-2 text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="px-2"
        >
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Price
        </Button>
      </div>
    ),
    cell: ({ renderValue }) => {
      const value = new Intl.NumberFormat().format(renderValue() as number);
      return <div className="text-right">${value}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="text-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(product.id)}
              >
                Copy product ID
              </DropdownMenuItem>
              <DropdownMenuItem>View product page</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export const data = [
  {
    id: '9486629',
    image:
      'https://diz36nn4q02zr.cloudfront.net/webapi/imagesV3/Original/SalePage/9486629/0/638538689332230000',
    name: '【Crash Baggage】 CRASH ICONIC 經典撞擊後背包',
    status: 'Active',
    price: 5280,
  },
  {
    id: '9486695',
    image:
      'https://diz36nn4q02zr.cloudfront.net/webapi/imagesV3/Original/SalePage/9486695/0/638543016114470000',
    name: '【Crash Baggage】 CRASH CNC 輕量撞擊後背包',
    status: 'Draft',
    price: 3980,
  },
  {
    id: '9736765',
    image:
      'https://diz36nn4q02zr.cloudfront.net/webapi/imagesV3/Original/SalePage/9736765/0/638537992215570000',
    name: 'Style Chair PMC 健康護脊電腦椅 雲感款 沉靜黑',
    status: 'Sold Out',
    price: 19880,
  },
  {
    id: '9597672',
    image:
      'https://diz36nn4q02zr.cloudfront.net/webapi/imagesV3/Original/SalePage/9597672/0/638520742188100000',
    name: '【Crash Baggage】 CRASH TRUNK 撞擊行李箱 32 吋 獵綠',
    status: 'Active',
    price: 15800,
  },
];
