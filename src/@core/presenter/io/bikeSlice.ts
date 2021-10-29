import axios from 'axios';
import { createSlice, Dispatch } from '@reduxjs/toolkit';

interface Bike {
  date_stolen: number;
  description: null;
  external_id: null;
  frame_colors: string[];
  frame_model: null;
  id: number;
  is_stock_img: boolean;
  large_img: string;
  location_found: null;
  manufacturer_name: string;
  registry_name: null;
  registry_url: null;
  serial: string;
  status: null;
  stolen: boolean;
  stolen_location: string;
  thumb: string;
  title: string;
  url: string;
  year: number;
}

export interface BikeSlice {
  allBike: Bike[] | null;
  count: number;
  page: number;
  rowsPerPage: number;
}

const initialState: BikeSlice = {
  allBike: null,
  count: 0,
  page: 0,
  rowsPerPage: 10,
}

export const getAllBike = (page: number, rowsPerPage: number, text: string) => async (dispatch: Dispatch) => {
  try {
    const query = text ? `&query=${text}` : '';
    const URL = `https://bikeindex.org/api/v3/search?page=${page + 1}&per_page=${rowsPerPage}&stolenness=stolen${query}`
    const result = await axios.get(URL)
    dispatch(setAllBike(result.data.bikes))
  } catch (error: any) {
    console.log('**** ERRROR ****', error)
    throw new Error(error.message);
  }
}

export const getCountAllBike = () => async (dispatch: Dispatch) => {
  try {
    const URL = 'https://bikeindex.org/api/v3/search/count'
    const result = await axios.get(URL)
    dispatch(setCountAllBike(result.data.stolen))
  } catch (error) {
    console.log('**** ERRROR ****', error)
  }
}

const bikeSlice = createSlice({
  name: 'bike',
  initialState,
  reducers: {
    setAllBike: (state, action) => {
      state.allBike = action.payload;
    },
    setCountAllBike: (state, action) => {
      state.count = action.payload;
    },
  }
})

export const { setAllBike, setCountAllBike } = bikeSlice.actions;

export default bikeSlice.reducer;