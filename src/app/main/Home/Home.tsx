import { Box, Button, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';

import { BikeSlice, getAllBike, getCountAllBike } from '../../../@core/presenter/io/bikeSlice';

import CustomTable from './CustomTable'

import './Home.css'

export default function Home() {

  const dispatch = useDispatch();
  const countAllBike = useSelector(({ bike } : { bike: BikeSlice }) => bike.count)
  const allBike = useSelector(({ bike } : { bike: BikeSlice }) => bike.allBike)

  console.log('allBike', allBike)
  console.log('countAllBike', countAllBike)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    async function fetchAsync() {
      try {
        await dispatch(getCountAllBike())
      } catch (error) {
        console.log('*** ERROR ***', error);
      }
    }
    fetchAsync()
  }, [dispatch])

  useEffect(() => {
    handleFindCases();
  }, [dispatch, page, rowsPerPage])

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => setTextSearch(event.target.value);

  const handleFindCases = async () => {
    try {
      setLoading(true)
      setError(false)
      await dispatch(getAllBike(page, rowsPerPage, textSearch))
      setLoading(false)
    } catch (error) {
      console.log('**** ERROR ***', error);
      setLoading(false)
      setError(true);
    }
  }

  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <p>Loading...</p>
          <CircularProgress size={20} />
        </Box>
      )
    } else if (error) {
      return (
        <p className='text-error'>Ooops, something went wrong</p>
      )
    } else if (allBike && allBike.length === 0) {
      return (
        <p className='text-result'>No results</p>
      )
    } else {
      return (
        <CustomTable 
          page={page} 
          rowsPerPage={rowsPerPage}
          countAllBike={countAllBike}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )
    }
  }

  return (
    <div className='root'>
      <div className='container-header'>
        <LocalPoliceIcon fontSize='large' />
        <div className='container-text-header'>
          <p className='title'>Police Departament of Berlin</p>
          <p className='subtitle'>Stolen bykes</p>
        </div>
      </div>
      <div className='container-input'>
        <TextField 
          id="outlined-basic" 
          size='small'
          label="Search cases description" 
          variant="outlined" 
          value={textSearch}
          onChange={handleChangeText}
        />
        <Button 
          style={{ marginLeft: 20 }}
          variant="outlined" 
          onClick={handleFindCases}
        >
          Find cases
        </Button>
      </div>
      <div className='box-total'>
        <p className='total'>Total: {countAllBike}</p>
      </div>
      {renderContent()}
    </div>
  )
}
