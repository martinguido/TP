import React, {useState, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  TextInput,
  Text,
  Modal,
  TouchableOpacity,
  PixelRatio,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from '../Card/index.js';
import styles from './home_style.js';

const Home = ({navigation}) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const [next, setNext] = useState('');
  const [search, setSearch] = useState('');
  const [stats, setStats] = useState('');
  const [species, setSpecies] = useState('');
  const [gender, setGender] = useState('');
  const [type, setType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const fontScale = React.useMemo(() => PixelRatio.getFontScale(), []);
  const defaultFontSize = 50;
  const iconSize = defaultFontSize * fontScale;
  const renderItem = ({item}) => (
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
    />
  );

  const setStart = () => {
    setCurrPage(1);
    setCharacters([]);
    setNext('');
  };

  const filterByName = text => {
    setStart();
    setSearch(text);
  };

  const filterByStats = stats => {
    setStart();
    setStats(stats);
  };

  const filterByGender = gender => {
    setStart();
    setGender(gender);
  };

  const filterByType = type => {
    setStart();
    setType(type);
  };

  const filterBySpecies = species => {
    setStart();
    setSpecies(species);
  };

  const setMoreData = () => {
    if (next !== null) {
      setCurrPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    fetch(
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
    )
      .then(response => response.json())
      .then(response => {
        if (Object.keys(response).length !== 1) {
          setCharacters(prevCharacters =>
            prevCharacters.concat(response.results),
          );
          setLoading(false);
          setNext(response.info.next);
        } else {
          setCharacters([]);
          setNext('');
        }
      })

      .catch(error => {
        console.log('error');
      });
  }, [currPage, search, stats, species, gender, type]);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.filtersContainer}>
          <TextInput
            placeholder=" Search name..."
            placeholderTextColor="grey"
            style={styles.searchName}
            value={search}
            onChangeText={text => filterByName(text)}
          />
          <TouchableOpacity
            style={styles.filter}
            onPress={() => setShowModal(true)}>
            <Icon name="filter" color="white" size={iconSize} />
          </TouchableOpacity>
        </View>
        <View>
          <Modal transparent={true} visible={showModal} animationType="fade">
            <View style={styles.modalCard}>
              <View style={styles.container2}>
                <View style={styles.containerInputs}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.text2}>Name:</Text>
                    <TextInput
                      placeholder="Type name..."
                      placeholderTextColor="white"
                      style={styles.searchBar}
                      value={search}
                      onChangeText={text => filterByName(text)}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.text2}>Specie:</Text>
                    <TextInput
                      placeholder="Type specie..."
                      placeholderTextColor="white"
                      style={styles.searchBar}
                      value={species}
                      onChangeText={species => filterBySpecies(species)}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.text2}>Type:</Text>
                    <TextInput
                      placeholder="Type type..."
                      placeholderTextColor="white"
                      style={styles.searchBar}
                      value={type}
                      onChangeText={type => filterByType(type)}
                    />
                  </View>
                </View>
                <View style={styles.separator2} />
                <View>
                  <View style={styles.options}>
                    <Text style={styles.text3}>Status:</Text>
                    <View style={styles.status}>
                      {stats === 'Dead' ? (
                        <>
                          <TouchableOpacity
                            style={styles.boxSelected}
                            title="Dead"
                            onPress={() => {
                              filterByStats('');
                            }}>
                            <Text style={styles.buttons}>Dead</Text>
                          </TouchableOpacity>
                        </>
                      ) : (
                        <TouchableOpacity
                          style={styles.box}
                          title="Dead"
                          onPress={() => {
                            filterByStats('Dead');
                          }}>
                          <Text style={styles.buttons}>Dead</Text>
                        </TouchableOpacity>
                      )}

                      {stats === 'Alive' ? (
                        <>
                          <TouchableOpacity
                            style={styles.boxSelected}
                            title="Alive"
                            onPress={() => filterByStats('')}>
                            <Text style={styles.buttons}>Alive</Text>
                          </TouchableOpacity>
                        </>
                      ) : (
                        <TouchableOpacity
                          style={styles.box}
                          title="Alive"
                          onPress={() => {
                            filterByStats('Alive');
                          }}>
                          <Text style={styles.buttons}>Alive</Text>
                        </TouchableOpacity>
                      )}

                      {stats === 'Unknown' ? (
                        <>
                          <TouchableOpacity
                            style={styles.boxSelected}
                            title="Unknown"
                            onPress={() => filterByStats('')}>
                            <Text style={styles.buttons}>Unknown</Text>
                          </TouchableOpacity>
                        </>
                      ) : (
                        <TouchableOpacity
                          style={styles.box}
                          title="Unknown"
                          onPress={() => {
                            filterByStats('Unknown');
                          }}>
                          <Text style={styles.buttons}>Unknown</Text>
                        </TouchableOpacity>
                      )}

                      <TouchableOpacity
                        style={styles.box}
                        title="Cualquiera"
                        onPress={() => filterByStats('')}>
                        <Text style={styles.buttons}>Any</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Text style={styles.text3}>Genre:</Text>
                  <View style={styles.status2}>
                    {gender === 'Female' ? (
                      <>
                        <TouchableOpacity
                          style={styles.box2Selected}
                          title="Female"
                          onPress={() => filterByGender('')}>
                          <Text style={styles.buttons}>Female</Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <TouchableOpacity
                        style={styles.box2}
                        title="Female"
                        onPress={() => filterByGender('Female')}>
                        <Text style={styles.buttons}>Female</Text>
                      </TouchableOpacity>
                    )}

                    {gender === 'Male' ? (
                      <>
                        <TouchableOpacity
                          style={styles.box2Selected}
                          title="Male"
                          onPress={() => filterByGender('')}>
                          <Text style={styles.buttons}>Male</Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <TouchableOpacity
                        style={styles.box2}
                        title="Male"
                        onPress={() => filterByGender('Male')}>
                        <Text style={styles.buttons}>Male</Text>
                      </TouchableOpacity>
                    )}

                    {gender === 'Genderless' ? (
                      <>
                        <TouchableOpacity
                          style={styles.box2Selected}
                          title="Genderless"
                          onPress={() => filterByGender('')}>
                          <Text style={styles.buttons}>Genderless</Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <TouchableOpacity
                        style={styles.box2}
                        title="Genderless"
                        onPress={() => filterByGender('Genderless')}>
                        <Text style={styles.buttons}>Genderless</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={styles.status2}>
                    {gender === 'Unknown' ? (
                      <>
                        <TouchableOpacity
                          style={styles.box2Selected}
                          title="Unknown"
                          onPress={() => filterByGender('')}>
                          <Text style={styles.buttons}>Unknown</Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <TouchableOpacity
                        style={styles.box2}
                        title="Unknown"
                        onPress={() => filterByGender('Unknown')}>
                        <Text style={styles.buttons}>Unknown</Text>
                      </TouchableOpacity>
                    )}

                    <TouchableOpacity
                      style={styles.box2}
                      title="Cualquiera"
                      onPress={() => filterByGender('')}>
                      <Text style={styles.buttons}>Any</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.close}
                  onPress={() => setShowModal(false)}>
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
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          onEndReachedThreshold={0.5}
          onEndReached={setMoreData}
        />
      )}
    </View>
  );
};

export default Home;
