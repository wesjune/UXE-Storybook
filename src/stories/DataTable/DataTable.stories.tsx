import type { Meta, StoryObj } from '@storybook/react';
import { ColumnDef } from '@tanstack/react-table';

import { DataTable } from '@/components';
import { columns, data } from './productListData';
import { fixedColumnsColumns, fixedColumnsRows } from './fixedColumnsData';

const meta = {
  title: 'Data Display/DataTable',
  component: DataTable,
  argTypes: {
    bordered: {
      description: 'Defines whether the table has borders.',
    },
    className: {
      description: 'Allows for custom CSS classes to be applied to the table.',
      table: { readonly: true },
    },
    columns: {
      description: 'Stores the column definitions for the table.',
      table: { readonly: true },
    },
    data: {
      description: 'Holds the data to be displayed in the table.',
    },
    fixedFirstColumn: {
      description:
        'Indicates if the first column of the table should be fixed.',
    },
    fixedLastColumn: {
      description: 'Indicates if the last column of the table should be fixed.',
    },
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProductList: Story = {
  args: {
    columns: columns as ColumnDef<unknown, unknown>[],
    data: data,
  },
};

export const FixedColumns: Story = {
  args: {
    bordered: true,
    className: '[&_td]:min-w-24',
    columns: fixedColumnsColumns,
    data: fixedColumnsRows,
    fixedFirstColumn: true,
    fixedLastColumn: true,
  },
};
