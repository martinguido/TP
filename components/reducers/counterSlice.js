import {createSlice} from '@reduxjs/toolkit';
//IMPORTAR COSAS EXTERNAS POR DEFAULT
import {PixelRatio, Animated} from 'react-native';
import app from '../connection.js';
import {onValue, ref, set, getDatabase, update} from 'firebase/database';
import Card from '../Card/index.js';
//import Animated from 'react-native-reanimated';
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
  deviceID: 2000,
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
  selectedID: '',
  selectedName: '',
  selectedImage: '',
  selectedState: '',
  selectedGender: '',
  selectedSpecie: '',


  colorIcon: 'white',
  //rotateAnimation: new Animated.Value(0),
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setShowModal: (state = initialState, booleano) => {
      state.showModal = booleano.payload;
    },
    getCharactersAPI: (state = initialState, response) => {
      if (Object.keys(response.payload).length !== 1) {
        state.charactersAPI = state.charactersAPI.concat(
          response.payload.results,
        );
        //state.charactersAPI.push(response.payload.results);
        console.log(state.charactersAPI);
        state.loading = false;
        state.next = response.payload.info.next;
      } else {
        state.charactersAPI = [];
        state.next = '';
      }
    },

    filterByName: (state = initialState, action) => {
      state.currPage = 1;
      state.charactersAPI = [];
      state.next = '';
      state.search = action.payload;
    },
    filterBySpecies: (state = initialState, action) => {
      state.currPage = 1;
      state.charactersAPI = [];
      state.next = '';
      state.species = action.payload;
    },
    filterByType: (state = initialState, action) => {
      state.currPage = 1;
      state.charactersAPI = [];
      state.next = '';
      state.type = action.payload;
    },
    filterByStats: (state = initialState, action) => {
      state.currPage = 1;
      state.charactersAPI = [];
      state.next = '';
      state.stats = action.payload;
    },
    filterByGender: (state = initialState, action) => {
      state.currPage = 1;
      state.charactersAPI = [];
      state.next = '';
      state.gender = action.payload;
    },

    setMoreData: (state = initialState) => {
      if (state.next !== null) {
        state.currPage += 1;
      }
    },
    incrementCurrPage: (state = initialState) => {
      state.currPage++;
      console.log(state.currPage);
    } /*
    createCard: item => {
      //RECIBE POR PARAMETRO UN ITEM
      console.log(item.charactersAPI[0].id);
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
      );
    },*/,
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

    uploadCharacter: (state = initialState, action) => {
      //state.colorIcon = 'gold',
      set(ref(db, 'characters/' + action.payload[1] + '/' + action.payload[0].id), {
        id: action.payload[0].id,
        nombre: action.payload[0].nombre,
        imagen: action.payload[0].imagen,
        estado: action.payload[0].estado,
        especie: action.payload[0].especie,
        genero: action.payload[0].genero,
        origen: action.payload[0].origen,
        ubicacion: action.payload[0].ubicacion,
        comentario: '',
      });
    },

    deleteCharacter: (state = initialState, action) => {
      //state.colorIcon = 'white',
      set(ref(db, 'characters/' + action.payload[1] + '/' + action.payload[0].id), null);
    },

    
    uploadComment: (state = initialState, action) => {
    update(ref(db, 'characters/' + action.payload[2] + '/' + action.payload[0]), {
      comentario: action.payload[1],
    });
  }



  },


});

export function fetchCharacters(
  search,
  stats,
  species,
  gender,
  type,
  currPage,
) {
  return async dispatch => {
    try {
      let response = await fetch(
        'https://rickandmortyapi.com/api/character?name=' +
          search +
          '&page=' +
          currPage +
          '&status=' +
          stats +
          '&species=' +
          species +
          '&gender=' +
          gender +
          '&type=' +
          type,
      );
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
  incrementCurrPage,
  uploadCharacter,
  deleteCharacter,
  uploadComment,
} = counterSlice.actions;

export default counterSlice.reducer;