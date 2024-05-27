import React from 'react';
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import CustomButton from '../../components/buttons/CustomButton';
import CustomDeleteButton from '../../components/buttons/CustomDeleteButton';

interface Column {
  id: string;
  label: string;
  align?: 'right' | 'left' | 'center' | string | any;
  format?: (value: any) => string;
}

interface CustomTableProps {
  columns: Column[];
  data: any[];
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
}

const CustomTable: React.FC<CustomTableProps> = ({ columns, data, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650 }} aria-label="custom table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align || 'left'}
              >
                {column.label}
              </TableCell>
            ))}
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => {
                const value = row[column.id];
                return (
                  <TableCell key={column.id} align={column.align || 'left'}>
                    {column.format ? column.format(value) : value}
                  </TableCell>
                );
              })}
              <TableCell align="center">
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', flexDirection:'row' }}>
                      <CustomButton text="Modifier" onClick={() => onEdit(row)} disabled={false} />
                      <CustomDeleteButton text="Supprimer" onClick={() => onDelete(row)} disabled={false}/>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
