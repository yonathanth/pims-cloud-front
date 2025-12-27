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

  const rows = products.map((product, index) => {
    // Handle different field names for product name
    // Support both camelCase (genericName/tradeName) and snake_case (generic_name/trade_name)
    const p = product as any;
    let productName = '';
    
    // Try camelCase first
    if (p.genericName) {
      productName = p.tradeName
        ? `${p.genericName} (${p.tradeName})`
        : p.genericName;
    } 
    // Try snake_case
    else if (p.generic_name) {
      productName = p.trade_name
        ? `${p.generic_name} (${p.trade_name})`
        : p.generic_name;
    }
    // Fallback to other field names
    else if (p.drugName) {
      productName = p.drugName;
    } else if (p.name) {
      productName = p.name;
    } else {
      productName = 'Unknown Product';
    }

    // Handle unit price - support both camelCase and snake_case
    const unitPrice = p.unitPrice ?? p.unit_price ?? 0;

    return {
      id: index.toString(),
      product: productName,
      sku: p.sku || '-',
      quantity: p.quantity ?? 0,
      unitPrice: `ETB ${unitPrice.toFixed(2)}`,
    };
  });

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
