import {createSlice} from '@reduxjs/toolkit';
//IMPORTAR COSAS EXTERNAS POR DEFAULT
import {PixelRatio} from 'react-native';
import app from '../connection.js';
import {onValue, ref, getDatabase} from 'firebase/database';
import Card from '../Card/index.js';
/*
import {getUniqueId} from 'react-native-device-info';
async function getID() {
  const dID = await getUniqueId();
  return dID;
}
*/
let db = getDatabase();
//TERMINAR DE IMPORTAR COSAS EXTERNAS
const initialState = {
  iconSize: PixelRatio.getFontScale() * 50,
  deviceID: 1000,
  charactersAPI: [],
  charactersRB: {},
  loading: true,
  hasErrors: false,
  loadingFav: true,
  fav: false,
  showModal: false,
  currPage: 1,
  next: '',
  search: '',
  stats: '',
  species: '',
  gender: '',
  type: '',
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    getCharactersAPI: (state = initialState, response) => {
      if (Object.keys(response.payload).length !== 1) {
        state.charactersAPI.push(response.payload.results);
        state.loading = false;
        state.next = response.payload.info.next;
      } else {
        state.charactersAPI = [];
        state.next = '';
      }
    },
  },
  setShowModal: (state = initialState) => {
    console.log('MARTIN');
    state.showModal = !state.showModal;
  },
  filterByName: (state = initialState) => {
    state.currPage = 1;
    state.charactersAPI = [];
    state.next = '';
    //FILTRAR RECIBE POR PARAMETRO UN TEXT
  },
  filterByStats: (state = initialState) => {
    state.currPage = 1;
    state.charactersAPI = [];
    state.next = '';
    //FILTRAR RECIBE POR PARAMETRO UN TEXT
  },
  filterByGender: (state = initialState) => {
    state.currPage = 1;
    state.charactersAPI = [];
    state.next = '';
    //FILTRAR RECIBE POR PARAMETRO UN TEXT
  },
  filterByType: (state = initialState) => {
    state.currPage = 1;
    state.charactersAPI = [];
    state.next = '';
    //FILTRAR RECIBE POR PARAMETRO UN TEXT
  },
  filterBySpecies: (state = initialState) => {
    state.currPage = 1;
    state.charactersAPI = [];
    state.next = '';
    //FILTRAR RECIBE POR PARAMETRO UN TEXT
  },
  setMoreData: (state = initialState) => {
    if (state.next !== null) {
      state.currPage += 1;
    }
  },
  createCard: item => {
    //RECIBE POR PARAMETRO UN ITEM
    console.log('MAMAAAAA');
    /*
    return (
      <Card
        showCom={false}
        id={item.payload.id}
        imagen={item.payload.image}
        nombre={item.payload.name}
        estado={item.payload.status}
        especie={item.payload.species}
        genero={item.payload.gender}
        origen={item.payload.origin.name}
        ubicacion={item.payload.location.name}
      />
    );*/
  },
  getNoCharactersAPI: (state = initialState) => {
    state.charactersAPI = [];
    state.next = '';
  },
  getErrorsAPI: (state = initialState) => {
    state.hasErrors = true;
  },
  setCharactersRB: (state = initialState) => {
    let dbRef = ref(db, 'characters/' + state.deviceID + '/');
    let charactersOff;
    onValue(dbRef, async snapshot => {
      charactersOff = await snapshot.val();
      if (charactersOff != null) {
        if (Array.isArray(charactersOff)) {
          var i = 0;
          while (i < charactersOff.length) {
            if (charactersOff[i] === undefined || charactersOff[i] === null) {
              charactersOff.splice(i, 1);
            } else {
              ++i;
            }
          }
          state.charactersRB.push(charactersOff);
          state.loadingFav = false;
          state.fav = true;
        } else {
          state.charactersRB.push(Object.values(charactersOff));
          state.loadingFav = false;
          state.fav = true;
        }
      } else {
        state.charactersRB = {};
        state.fav = false;
        state.loadingFav = false;
      }
    });
  },
});

export function fetchCharacters() {
  return async dispatch => {
    try {
      let response = await fetch('https://rickandmortyapi.com/api/character?');
      response = await response.json();
      if (Object.keys(response).length !== 1) {
        dispatch(getCharactersAPI(response));
      } else {
        dispatch(getNoCharactersAPI());
      }
    } catch (error) {
      dispatch(getErrorsAPI());
    }
  };
}

// Action creators are generated for each case reducer function
export const {
  getCharactersAPI,
  getNoCharactersAPI,
  getErrorsAPI,
  setCharactersRB,
  setShowModal,
  filterByGender,
  filterByName,
  filterBySpecies,
  filterByStats,
  filterByType,
  createCard,
  setMoreData,
} = counterSlice.actions;

export default counterSlice.reducer;