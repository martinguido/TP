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
    setCharactersAPI: (state = initialState) => {
      fetch(
        'https://rickandmortyapi.com/api/character?name=' +
          state.search +
          '&page=' +
          state.currPage +
          '&status=' +
          state.stats +
          '&species=' +
          state.species +
          '&gender=' +
          state.gender +
          '&type=' +
          state.type,
      )
        .then(response => response.json())
        .then(response => {
          if (Object.keys(response).length !== 1) {
            console.log('state.next');

            state.charactersAPI.push(response.results);
            console.log(state.charactersAPI);
            state.loading = false;
            state.next = response.info.next;
          } else {
            state.charactersAPI = [];
            state.next = '';
          }
        })
        .catch(error => {
          console.log('error');
        });
    },
    setShowModal: (state = initialState) => {
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
    renderItem: (state = initialState) => {
      //RECIBE POR PARAMETRO UN ITEM
      /*
        <Card
          showCom={false}
          id={item.id}
          imagen={item.image}
          nombre={item.name}
          estado={item.status}
          especie={item.species}
          genero={item.gender}
          origen={item.origin.name}
          ubicacion={item.location.name}
        />;
        */
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
  },
});

// Action creators are generated for each case reducer function
export const {
  setCharactersAPI,
  setCharactersRB,
  setShowModal,
  filterByGender,
  filterByName,
  filterBySpecies,
  filterByStats,
  filterByType,
  renderItem,
  setMoreData,
} = counterSlice.actions;

export default counterSlice.reducer;
