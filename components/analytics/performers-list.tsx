'use client';

import { TopPerformer } from '@/types/analytics';
import { Tile, DataTable, TableContainer, Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from '@carbon/react';

interface PerformersListProps {
  performers?: TopPerformer[];
}

export function PerformersList({ performers = [] }: PerformersListProps) {
  const headers = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'volumeSold', header: 'Volume Sold' },
  ];

  const rows = performers.map((performer, index) => ({
    id: index.toString(),
    name: performer.name,
    email: performer.email,
    volumeSold: performer.volumeSold,
  }));

  return (
    <Tile className="table-tile">
      <h3 className="table-title">
        Top Performers
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
                        No performers found
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
