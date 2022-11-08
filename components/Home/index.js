import React, {useState, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  TextInput,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from '../Card/index.js';
import styles from './home_style.js';

import {useDispatch, useSelector} from 'react-redux';
import {
  fetchCharacters,
  setMoreData,
  setShowModal,
  filterByName,
  filterByGender,
  filterBySpecies,
  filterByStats,
  filterByType,
  createCard,
} from '../reducers/counterSlice.js';
import {fetchAPI} from '../reducers/fetchAPI.js';

const Home = ({navigation}) => {
  const iconSize = useSelector(state => state.counter.iconSize);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  const characters = useSelector(state => state.counter.charactersAPI)[0];
  const loading = useSelector(state => state.counter.loading);

  const renderItems = ({item}) => {
    dispatch(createCard(item));
  };
  /*   <Card
      showCom={false}
      id={item.id}
      imagen={item.image}
      nombre={item.name}
      estado={item.status}
      especie={item.species}
      genero={item.gender}
      origen={item.origin.name}
      ubicacion={item.location.name}
    />
    */

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.filtersContainer}>
          <TextInput
            placeholder=" Search name..."
            placeholderTextColor="grey"
            style={styles.searchName}
            value={useSelector(state => state.counter.search)}
            //onChangeText={text => dispatch(filterByName(text))}
          />
          <TouchableOpacity
            style={styles.filter}
            onPress={() => dispatch(setShowModal(true))}>
            <Icon name="filter" color="white" size={iconSize} />
          </TouchableOpacity>
        </View>
        <View>
          <Modal
            transparent={true}
            visible={useSelector(state => state.counter.showModal)}
            animationType="fade">
            <View style={styles.modalCard}>
              <View style={styles.container2}>
                <View style={styles.containerInputs}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.text2}>Name:</Text>
                    <TextInput
                      placeholder="Type name..."
                      placeholderTextColor="white"
                      style={styles.searchBar}
                      value={useSelector(state => state.counter.search)}
                      // onChangeText={text => dispatch(filterByName(text))}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.text2}>Specie:</Text>
                    <TextInput
                      placeholder="Type specie..."
                      placeholderTextColor="white"
                      style={styles.searchBar}
                      value={useSelector(state => state.counter.species)}
                      // onChangeText={species =>
                      //  dispatch(filterBySpecies(species)) }
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.text2}>Type:</Text>
                    <TextInput
                      placeholder="Type type..."
                      placeholderTextColor="white"
                      style={styles.searchBar}
                      value={useSelector(state => state.counter.type)}
                      // onChangeText={type => dispatch(filterByType(type))}
                    />
                  </View>
                </View>
                <View style={styles.separator2} />
                <View>
                  <View style={styles.options}>
                    <Text style={styles.text3}>Status:</Text>
                    <View style={styles.status}>
                      {useSelector(state => state.counter.stats) === 'Dead' ? (
                        <>
                          <TouchableOpacity
                            style={styles.boxSelected}
                            title="Dead"
                            // onPress={() => {
                            //  dispatch(filterByStats(''));}}
                          >
                            <Text style={styles.buttons}>Dead</Text>
                          </TouchableOpacity>
                        </>
                      ) : (
                        <TouchableOpacity
                          style={styles.box}
                          title="Dead"
                          //onPress={() => {
                          // dispatch(filterByStats('Dead'));}}
                        >
                          <Text style={styles.buttons}>Dead</Text>
                        </TouchableOpacity>
                      )}

                      {useSelector(state => state.counter.stats) === 'Alive' ? (
                        <>
                          <TouchableOpacity
                            style={styles.boxSelected}
                            title="Alive"
                            //onPress={() => dispatch(filterByStats(''))}
                          >
                            <Text style={styles.buttons}>Alive</Text>
                          </TouchableOpacity>
                        </>
                      ) : (
                        <TouchableOpacity
                          style={styles.box}
                          title="Alive"
                          //onPress={() => {
                          //  dispatch(filterByStats('Alive')); }}
                        >
                          <Text style={styles.buttons}>Alive</Text>
                        </TouchableOpacity>
                      )}

                      {useSelector(state => state.counter.stats) ===
                      'Unknown' ? (
                        <>
                          <TouchableOpacity
                            style={styles.boxSelected}
                            title="Unknown"
                            //onPress={() => dispatch(filterByStats(''))}
                          >
                            <Text style={styles.buttons}>Unknown</Text>
                          </TouchableOpacity>
                        </>
                      ) : (
                        <TouchableOpacity
                          style={styles.box}
                          title="Unknown"
                          //nPress={() => {
                          //  dispatch(filterByStats('Unknown'));}}
                        >
                          <Text style={styles.buttons}>Unknown</Text>
                        </TouchableOpacity>
                      )}

                      <TouchableOpacity
                        style={styles.box}
                        title="Cualquiera"
                        //onPress={() => dispatch(filterByStats(''))}
                      >
                        <Text style={styles.buttons}>Any</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Text style={styles.text3}>Genre:</Text>
                  <View style={styles.status2}>
                    {useSelector(state => state.counter.stats) === 'Female' ? (
                      <>
                        <TouchableOpacity
                          style={styles.box2Selected}
                          title="Female"
                          //onPress={() => dispatch(filterByGender(''))}
                        >
                          <Text style={styles.buttons}>Female</Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <TouchableOpacity
                        style={styles.box2}
                        title="Female"
                        //onPress={() => dispatch(filterByGender('Female'))}
                      >
                        <Text style={styles.buttons}>Female</Text>
                      </TouchableOpacity>
                    )}

                    {useSelector(state => state.counter.stats) === 'Male' ? (
                      <>
                        <TouchableOpacity
                          style={styles.box2Selected}
                          title="Male"
                          //onPress={() => dispatch(filterByGender(''))}
                        >
                          <Text style={styles.buttons}>Male</Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <TouchableOpacity
                        style={styles.box2}
                        title="Male"
                        //onPress={() => dispatch(filterByGender('Male'))}
                      >
                        <Text style={styles.buttons}>Male</Text>
                      </TouchableOpacity>
                    )}

                    {useSelector(state => state.counter.stats) ===
                    'Genderless' ? (
                      <>
                        <TouchableOpacity
                          style={styles.box2Selected}
                          title="Genderless"
                          //onPress={() => dispatch(filterByGender(''))}
                        >
                          <Text style={styles.buttons}>Genderless</Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <TouchableOpacity
                        style={styles.box2}
                        title="Genderless"
                        //onPress={() => dispatch(filterByGender('Genderless'))}
                      >
                        <Text style={styles.buttons}>Genderless</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={styles.status2}>
                    {useSelector(state => state.counter.stats) === 'Unknown' ? (
                      <>
                        <TouchableOpacity
                          style={styles.box2Selected}
                          title="Unknown"
                          //onPress={() => dispatch(filterByGender(''))}
                        >
                          <Text style={styles.buttons}>Unknown</Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <TouchableOpacity
                        style={styles.box2}
                        title="Unknown"
                        //onPress={() => dispatch(filterByGender('Unknown'))}
                      >
                        <Text style={styles.buttons}>Unknown</Text>
                      </TouchableOpacity>
                    )}

                    <TouchableOpacity
                      style={styles.box2}
                      title="Cualquiera"
                      //onPress={() => dispatch(filterByGender(''))}
                    >
                      <Text style={styles.buttons}>Any</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.close}
                  //onPress={() => dispatch(setShowModal(false))}
                >
                  <Text style={styles.apply}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="grey" animating={loading} />
      ) : (
        <FlatList
          style={({height: '100%'}, {width: '100%'})}
          keyExtractor={item => item.id}
          data={characters}
          renderItem={renderItems}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          //onEndReachedThreshold={0.5}
          //onEndReached={dispatch(setMoreData())}
        />
      )}
    </View>
  );
};

export default Home;
