import React, {useState, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  TextInput,
  Text,
  Modal,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from '../Card/index.js';
import Filter from '../Filter/index.js';
import styles from './home_style.js';

import {useDispatch, useSelector} from 'react-redux';
import {
  fetchCharacters,
  //setMoreData,
  setShowModal,
  filterByName,
  filterByGender,
  filterBySpecies,
  filterByStats,
  filterByType,
  createCard,
  incrementCurrPage,
  fetchCharactersRB,
} from '../reducers/counterSlice.js';

const Home = ({navigation}) => {
  //const iconSize = useSelector(state => state.counter.iconSize);
  const {
    iconSize,
    deviceID,
    charactersAPI,
    loading,
    showModal,
    search,
    stats,
    species,
    gender,
    type,
    currPage,
    next,
  } = useSelector(state => state.counter);
  const dispatch = useDispatch();

  useEffect(() => {
    //console.log('FETCH  ' + currPage);
    dispatch(fetchCharacters(search, stats, species, gender, type, currPage));
    dispatch(fetchCharactersRB(deviceID));
  }, [dispatch, search, stats, species, gender, type, currPage, deviceID]);

  let characters = charactersAPI; //[0]; //useSelector(state => state.counter.charactersAPI)[0];
  //const loading = useSelector(state => state.counter.loading);
  const setMoreData = () => {
    if (next !== null) {
      dispatch(incrementCurrPage());
      //console.log(currPage);
    }
  };


  const renderItems = ({item}) => {
    //dispatch(createCard(item)); /*
    return (
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
        fav = {false}
      />
    );
    
  };
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.filtersContainer}>
          <TextInput
            placeholder=" Search name..."
            placeholderTextColor="grey"
            style={styles.searchName}
            value={search}
            onChangeText={text => dispatch(filterByName(text))}
          />
          <TouchableOpacity
            style={styles.filter}
            onPress={() => dispatch(setShowModal(true))}>
            <Icon name="filter" color="white" size={iconSize} />
          </TouchableOpacity>
        </View>
        <View>
          <Filter/>      
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="grey" animating={loading} />
      ) : (
        <Animated.FlatList
          style={({height: '100%'}, {width: '100%'})}
          keyExtractor={item => item.id}
          data={characters}
          renderItem={renderItems}
          //renderItem={({item}) => dispatch(crearCarta(item))}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          onEndReachedThreshold={0.5}
          onEndReached={setMoreData}
        />
      )}
    </View>
  );
};

export default Home;
