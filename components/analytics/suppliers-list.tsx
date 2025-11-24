'use client';

import { SupplierSummary } from '@/types/analytics';
import { Tile, DataTable, TableContainer, Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from '@carbon/react';

interface SuppliersListProps {
  suppliers?: SupplierSummary[];
}

export function SuppliersList({ suppliers = [] }: SuppliersListProps) {
  const headers = [
    { key: 'name', header: 'Supplier Name' },
    { key: 'volumeSupplied', header: 'Volume Supplied' },
    { key: 'ordersDelivered', header: 'Orders Delivered' },
  ];

  const rows = suppliers.map((supplier) => ({
    id: supplier.id.toString(),
    name: supplier.name,
    volumeSupplied: supplier.volumeSupplied,
    ordersDelivered: supplier.ordersDelivered,
  }));

  return (
    <Tile className="table-tile">
      <h3 className="table-title">
        Top Suppliers
      </h3>
      <DataTable rows={rows} headers={headers} isSortable>
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
                        No suppliers found
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
