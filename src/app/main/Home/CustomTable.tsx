import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ImageIcon from '@mui/icons-material/Image';

import { useSelector } from 'react-redux';

import { BikeSlice } from '../../../@core/presenter/io/bikeSlice';

import './Home.css'
import moment from 'moment';

interface Props {
  page: number;
  rowsPerPage: number;
  countAllBike: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CustomTable(props: Props) {
  const { page, rowsPerPage, countAllBike, handleChangePage, handleChangeRowsPerPage } = props;
  const allBike = useSelector(({ bike } : { bike: BikeSlice }) => bike.allBike)

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 540 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableBody>
            {allBike && allBike
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell align='left' >
                      <div className='item'>
                        <div className='icon-img'>
                          {row.large_img ? (
                              <img src={row.large_img} className='image' />
                          ) : (
                              <ImageIcon fontSize='large' />
                          )}
                        </div>
                        <div className='container-text-item'>
                          <p className='title-item'>{row.title}</p>
                          {row.description && (
                            <p className='description-item'>{row.description}</p>
                          )}
                          {row.date_stolen && (
                            <p className='date-item'>{moment(new Date(row.date_stolen)).format('ddd MMM DD')} {row.year} - {row.stolen_location}</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={countAllBike}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
