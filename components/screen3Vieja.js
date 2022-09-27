import React, {useState, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';
import Card from './card';
import Icon from 'react-native-vector-icons/FontAwesome';

const Screen3 = () => {
  const [characters, setCharacters] = useState([]);

  const [loading, setLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const [next, setNext] = useState('');

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);

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

  const searchFilterFunction = text => {
    if (text === '') {
      setCurrPage(1);
      setCharacters([]);
      setSearch('');
      setNext('');
    } else {
      setCurrPage(1);
      setCharacters([]);
      setSearch(text);
      setNext('');
    }
  };
  /*
  const getItem = item => {
    alert('Id : ' + item.id + ' Name : ' + item.name);
  };
*/
  const setMoreData = () => {
    if (next !== null) {
      setCurrPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    if (search === '') {
      fetch('https://rickandmortyapi.com/api/character?page=' + currPage)
        .then(response => response.json())
        .then(response => {
          setCharacters(prevCharacters =>
            prevCharacters.concat(response.results),
          );
          setNext(response.info.next);
          setLoading(false);
          console.log('Se actualizo');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      fetch(
        'https://rickandmortyapi.com/api/character?name=' +
          search +
          '&page=' +
          currPage,
      )
        .then(response => response.json())
        .then(response => {
          if (Object.keys(response).length !== 1) {
            setCharacters(prevCharacters =>
              prevCharacters.concat(response.results),
            );
            setNext(response.info.next);
            console.log('Se actualizo');
          } else {
            setCharacters([]);
            setNext('');
          }
        })

        .catch(error => {
          console.log('error');
        });
    }
  }, [currPage, search]);
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <TextInput
          placeholder="Type here..."
          placeholderTextColor="black"
          style={styles.searchBar__clicked}
          value={search}
          onChangeText={text => searchFilterFunction(text)}
        />
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
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
