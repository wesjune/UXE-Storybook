interface Columns {
  [key: string]: string;
}

function createColumns(numberOfColumns: number) {
  const columns = [];

  for (let i = 1; i <= numberOfColumns; i++) {
    const column = {
      accessorKey: `column${i.toString().padStart(2, '0')}`,
      header: `Column ${i.toString().padStart(2, '0')}`,
    };
    columns.push(column);
  }

  return columns;
}

export const fixedColumnsColumns = createColumns(20);

function createData(numberOfRows: number) {
  const data = [];

  for (let row = 1; row <= numberOfRows; row++) {
    const rowData: Columns = {};

    for (let col = 1; col <= numberOfRows; col++) {
      rowData[`column${col.toString().padStart(2, '0')}`] =
        `Column ${col.toString().padStart(2, '0')} Row ${row.toString().padStart(2, '0')}`;
    }

    data.push(rowData);
  }

  return data;
}

export const fixedColumnsRows = createData(20);
