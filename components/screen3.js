import React, {useState, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
  Text,
} from 'react-native';
import Card from './card';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    //<MyModal estado={item.status} especie={item.species} genero={item.gender} />
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
          console.log('Nombre:', search);
          console.log('Status:', stats);
          console.log('Species:', species);
          console.log('Gender:', gender);
          console.log('type:', type);
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
      <View style={styles.container2}>
        <TextInput
          placeholder="Escriba el nombre aca..."
          placeholderTextColor="black"
          style={styles.searchBarName__clicked}
          value={search}
          onChangeText={text => filterByName(text)}
        />
        <TextInput
          placeholder="Escriba la especie aca..."
          placeholderTextColor="black"
          style={styles.searchBarSpecies__clicked}
          value={species}
          onChangeText={s => filterBySpecies(s)}
        />
        <TextInput
          placeholder="Escriba el tipo aca..."
          placeholderTextColor="black"
          style={styles.searchBarType__clicked}
          value={type}
          onChangeText={t => filterByType(t)}
        />
        <View>
          <Text>Estado</Text>
          <View style={styles.status}>
            <Button title="Dead" onPress={() => filterByStats('Dead')}>
              Dead
            </Button>
            <Button title="Alive" onPress={() => filterByStats('Alive')}>
              Alive
            </Button>
            <Button title="Unknown" onPress={() => filterByStats('Unknown')}>
              Unknown
            </Button>
            <Button title="Cualquiera" onPress={() => filterByStats('')}>
              Cualquiera
            </Button>
          </View>
        </View>
        <View>
          <Text>Genero</Text>
          <View style={styles.gender}>
            <Button title="Female" onPress={() => filterByGender('Female')}>
              Female
            </Button>
            <Button title="Male" onPress={() => filterByGender('Male')}>
              Male
            </Button>
            <Button
              title="Genderless"
              onPress={() => filterByGender('Genderless')}>
              Genderless
            </Button>
            <Button title="Unknown" onPress={() => filterByGender('Unknown')}>
              Unknown
            </Button>
            <Button title="Cualquiera" onPress={() => filterByGender('')}>
              Cualquiera
            </Button>
          </View>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="grey" animating={loading} />
      ) : (
        <FlatList
          style={({height: '100%'}, {width: '100%'})}
          keyExtractor={item => item.id.toString()}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '5%',
    marginBottom: '3%',
    width: '80%',
    height: '5%',
  },
  searchbar: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    width: '85%',
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 20,
    paddingLeft: '6%',
  },
  separator: {
    width: '90%',
    height: 3,
    backgroundColor: 'white',
    borderRadius: 30,
    alignSelf: 'center',
  },
  filter_icon: {
    width: '10%',
    marginLeft: '5%',
    height: '100%',
    borderRadius: 30,
    color: 'white',
    justifyContent: 'space-evenly',
    fontSize: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'black',
  },
  loader: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,1)',
    height: '25%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderactivity: {
    flex: 1,
  },
  container2: {
    marginTop: 70,
    margin: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    width: '90%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    height: 600,
  },
  status: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    width: '90%',
    backgroundColor: '#d9dbda',
  },
  gender: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    width: '90%',
    backgroundColor: '#d9dbda',
  },
  searchBar__clicked: {
    padding: 10,
    width: '95%',
    height: 40,
    flexDirection: 'row',
    //width: "80%",
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    fontSize: 30,
    marginLeft: 10,
    width: '90%',
  },
});
