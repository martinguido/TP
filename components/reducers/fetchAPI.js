import {createAsyncThunk} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
export const fetchAPI = createAsyncThunk(
  // The first argument is the action name:
  'fetchAPI',

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
    console.log(data);

    // Return result:
    return data;
  },
);
