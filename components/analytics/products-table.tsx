'use client';

import { Product } from '@/types/analytics';
import { Tile, DataTable, TableContainer, Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from '@carbon/react';

interface ProductsTableProps {
  products?: Product[];
  title: string;
}

export function ProductsTable({ products = [], title }: ProductsTableProps) {
  const headers = [
    { key: 'product', header: 'Product' },
    { key: 'sku', header: 'SKU' },
    { key: 'quantity', header: 'Quantity' },
    { key: 'unitPrice', header: 'Unit Price' },
  ];

  const rows = products.map((product, index) => ({
    id: index.toString(),
    product: product.tradeName || product.genericName,
    sku: product.sku || '-',
    quantity: product.quantity,
    unitPrice: `$${product.unitPrice.toFixed(2)}`,
  }));

  return (
    <Tile className="table-tile">
      <h3 className="table-title">
        {title}
      </h3>
      <DataTable
        rows={rows}
        headers={headers}
        isSortable
      >
        {({ rows, headers, getHeaderProps, getTableProps }) => (
          <TableContainer className="responsive-table-container">
            <Table {...getTableProps()} className="responsive-table">
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({ header })} key={header.key}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={headers.length}>
                      <p className="empty-state-text">
                        No products found
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>
    </Tile>
  );
}
