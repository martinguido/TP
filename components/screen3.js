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
  const [text, onChangeText] = useState('');
  const [currPage, setCurrPage] = useState(41);
  const [next, setNext] = useState('');
  /*
  fetch('https://rickandmortyapi.com/api/character?page=1')
    .then(response => response.json())
    .then(response => {
      setCharacters(response.results);
      setLoading(false);
      console.log('La cantidad de personajes es', characters.length);
    });
 */
  const renderItem = ({item}) => (
    <Card imagen={item.image} nombre={item.name} estado={item.status} especie={item.species} genero={item.gender} origen={item.origin.name} ubicacion={item.location.name}/>
    //<MyModal estado={item.status} especie={item.species} genero={item.gender} />
  );

  const setMoreData = () => {
    if (next !== null) {
      setCurrPage(prevPage => prevPage + 1);
    }
    /*
    fetch('https://rickandmortyapi.com/api/character?page=' + currPage)
      .then(response => response.json())
      .then(response => {
        setCharacters(prevCharacters =>
          prevCharacters.concat(response.results),
        );
        console.log(
          'La cantidad ACTUALIZADA de personajes es',
          characters.length,
        );
      });
      */
  };
  /*
  React.useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character?page=')
      .then(response => response.json())
      .then(response => {
        setCharacters(response.results);
        setLoading(false);
        console.log('La cantidad de personajes es', characters.length);
      });
  }, [characters.length]);
*/
  React.useEffect(() => {
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
  }, [currPage]);
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          placeholder="Escribi un personaje..."
          onChangeText={onChangeText}
          value={text}
          style={styles.searchbar}
        />
        <Icon name="filter" style={styles.filter_icon} />
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
});
