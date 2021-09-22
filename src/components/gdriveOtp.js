import axios from 'axios';
import { useEffect, useState } from 'react';
import {Back} from './back.js';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
export const GdriveOtp = () => {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const getData = () => {
        setLoading(true);
        axios.get(`https://google-drive-ak-back-end.herokuapp.com/otp/get`)
        .then(res=>{
            if(res.status===200){
                setData(res.data);
                setLoading(false);
            }
        })
        .catch(res=>console.log(res))
    }
    try{
        useEffect(getData,[]);
    }catch(e){
        console.log(e);
    }
    const columns = [
        { id: 'email', label: 'Email', minWidth: 170 },
        {
          id: 'otp',
          label: 'Otp',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        },
        { id: 'deleteotp', label: 'delete', minWidth: 100,align:'right' }
      ];
      function createData(email, otp, deleteotp) {
        return {email, otp, deleteotp}
      }
      const rows = data.map(d=>createData(d.email,d.otp,"delete"))

      const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(10);
    
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
      const deleteOtp = (delId) => {
          setLoading(true);
          axios.delete(`https://google-drive-ak-back-end.herokuapp.com/otp/delete/${delId}`)
          .then(res=>{
              if(res.data.message==="green"){
                  setLoading(false);
                  getData();
              }
          })
      }
    return(
        <>
            {loading ? <LinearProgress/> : ''}
            {/* <LinearProgress/> */}
            <Back/>
            <h1>Google drive otp</h1>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          <h4>{column.label}</h4>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row,index) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                value !== "delete" ? (
                                    <>
                                        <TableCell key={column.id} align={column.align}>
                                          {column.format && typeof value === 'number'
                                            ? column.format(value)
                                            : value}
                                        </TableCell>
                                    </>
                                ) : (
                                    <>
                                        <TableCell key={column.id} align={column.align}>
                                            <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={()=>deleteOtp(data[index]['_id'])}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </>
                                )
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
        </>
    )
}