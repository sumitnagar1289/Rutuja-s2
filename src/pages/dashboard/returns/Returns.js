import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Typography } from '@material-ui/core';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.grey[100],
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

function Returns() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8080/api/returns');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
        <Typography variant="h5" align="center" className="headingStyles">
      Returns
    </Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Item Name</StyledTableCell>
            <StyledTableCell>Date of Delivery</StyledTableCell>
            <StyledTableCell>Date of Return</StyledTableCell>
            <StyledTableCell>Return Godown ID</StyledTableCell>
            <StyledTableCell>Quantity</StyledTableCell>
            <StyledTableCell>Invoice No.</StyledTableCell>
            <StyledTableCell>Returned By</StyledTableCell>
            <StyledTableCell>Receipt No.</StyledTableCell>
            <StyledTableCell>Bill Value</StyledTableCell>
            <StyledTableCell>Checked By</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.product.name}
              </TableCell>
              <TableCell>{row.deliveryDate}</TableCell>
              <TableCell>{row.returnDate}</TableCell>
              <TableCell>{row.godown.id}</TableCell>
              <TableCell>{row.invoice.quantity}</TableCell>
              <TableCell>{row.invoice.id}</TableCell>
              <TableCell>{row.returnedBy}</TableCell>
              <TableCell>{row.receiptNo}</TableCell>
              <TableCell>{row.invoice.billValue}</TableCell>
              <TableCell>{row.invoice.billCheckedBy.name}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default Returns;
