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
import Card from './card';
import styles from './Screen3_component.style.js';

const Screen3 = () => {
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
  const [colour, setColour] = useState('grey');
  const handleClick = color => setColour(color);

  const renderItem = ({item}) => (
    <Card
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
            placeholder="Type name..."
            placeholderTextColor="black"
            style={styles.searchName}
            value={search}
            onChangeText={text => filterByName(text)}
          />
          <TouchableOpacity
            style={styles.filter}
            onPress={() => setShowModal(true)}>
            <Text style={styles.filterText}>Fltr</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Modal transparent={true} visible={showModal} animationType="slide">
            <View style={styles.container2}>
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
                  placeholderTextColor="black"
                  style={styles.searchBar}
                  value={species}
                  onChangeText={s => filterBySpecies(s)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.text2}>Type:</Text>
                <TextInput
                  placeholder="Type type..."
                  placeholderTextColor="black"
                  style={styles.searchBar}
                  value={type}
                  onChangeText={t => filterByType(t)}
                />
              </View>

              <View>
                <Text style={styles.text3}>Status:</Text>
                <View style={styles.status}>
                  <TouchableOpacity
                    style={[styles.box, {backgroundColor: colour}]}
                    title="Dead"
                    /*onPressIn={() => handleClick('red')}*/ onPress={() => {
                      filterByStats('Dead'), handleClick('red');
                    }}>
                    <Text>Dead</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.box}
                    title="Alive"
                    onPress={() => filterByStats('Alive')}>
                    <Text>Alive</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.box}
                    title="Unknown"
                    onPress={() => filterByStats('Unknown')}>
                    <Text>Unknown</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.box}
                    title="Cualquiera"
                    onPress={() => filterByStats('')}>
                    <Text>Any</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Text style={styles.text3}>Genre:</Text>
                <View style={styles.status2}>
                  <TouchableOpacity
                    style={styles.box2}
                    title="Female"
                    onPress={() => filterByGender('Female')}>
                    <Text>Female</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.box2}
                    title="Male"
                    onPress={() => filterByGender('Male')}>
                    <Text>Male</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.box2}
                    title="Genderless"
                    onPress={() => filterByGender('Genderless')}>
                    <Text>Genderless</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.status2}>
                  <TouchableOpacity
                    style={styles.box2}
                    title="Unknown"
                    onPress={() => filterByGender('Unknown')}>
                    <Text>Unknown</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.box2}
                    title="Cualquiera"
                    onPress={() => filterByGender('')}>
                    <Text>Any</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={styles.close}
                onPress={() => setShowModal(false)}>
                <Text style={styles.x}>Apply</Text>
              </TouchableOpacity>
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

export default Screen3;
