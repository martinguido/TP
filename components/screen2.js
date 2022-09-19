import React, {useEffect, useState} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';
import Card from './card';
import Icon from 'react-native-vector-icons/FontAwesome';

const Screen2 = () => {
  /*
  const [characters, setcharacters] = useState();
  const [next, setNext] = useState();
  setTimeout(() => {
    fetch('https://rickandmortyapi.com/api/character?page=')
      .then(response => response.json())
      .then(response => {
        setNext(response.info.next);
        setcharacters(response.results);
        setLoading(false);
      });
  }, 5000);


*/
  const [loading, setLoading] = useState(true);
  const [text, onChangeText] = React.useState(null);
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);

  useEffect(() => {
    console.log('useEffect pageCurrent: ', pageCurrent);
    setIsLoading(true);
    const getCharacters = async () => {
      const apiURL =
        'https://rickandmortyapi.com/api/character?page=' + pageCurrent;
      fetch(apiURL)
        .then(res => res.json())
        .then(resJson => {
          setCharacters(characters.concat(resJson));
          setIsLoading(false);
        });
    };
    getCharacters();
    return () => {};
  }, [characters, pageCurrent]);

  const handleLoadMore = () => {
    if (this.pageCurrent < 42) {
      setPageCurrent(pageCurrent + 1);
      setIsLoading(true);
    }
  };
  const renderItem = ({item}) => (
    <Card imagen={item.image} nombre={item.name} />
  );

  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator
          style={styles.loaderactivity}
          size="large"
          color="grey"
        />
      </View>
    ) : null;
  };
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
        <ActivityIndicator size="large" color="grey" animating={isLoading} />
      ) : (
        <FlatList
          style={({height: '100%'}, {width: '100%'})}
          key={item => item.id}
          data={characters}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={renderLoader}
          onEndReachedThreshold={5}
          onEndReached={handleLoadMore}
        />
      )}
    </View>
  );
};

export default Screen2;

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
    backgroundColor: 'rgba(255,255,255,0)',
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
