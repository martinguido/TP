import {createAsyncThunk} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCharactersAPI,
  getNoCharactersAPI,
  getErrorsAPI,
} from './counterSlice';

export const fetchAPI = createAsyncThunk(
  // The first argument is the action name:
  'fetchAPI',
  /*
  // The second one is a function
  // called payload creator.
  // It contains async logic of a side-effect.
  // We can perform requests here,
  // work with device API,
  // or any other async APIs we need to.
  async () => {
    // Fetch the backend endpoint:
    const response = await fetch('https://rickandmortyapi.com/api/character?');

    // Get the JSON from the response:
    const data = await response.json();
    //console.log(data);

    const estado = useSelector(state => state.counter.fav);
    console.log('HOLA' + estado);
    const dispatch = useDispatch();

    dispatch(getCharactersAPI(estado, data));

    // Return result:
    return data;
  },
  */
  async dispatch => {
    try {
      let response = await fetch('https://rickandmortyapi.com/api/character?');
      response = await response.json();
      if (Object.keys(response).length !== 1) {
        console.log(response.results);
        dispatch(getCharactersAPI(response));
      } else {
        dispatch(getNoCharactersAPI());
      }
    } catch (error) {
      dispatch(getErrorsAPI());
    }
  },
);
