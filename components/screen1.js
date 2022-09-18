import React, {useState} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';
import Card from './card';

const Screen1 = () => {
  const [characters, setcharacters] = useState();
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(response => response.json())
      .then(response => {
        setcharacters(response.results);
        setLoading(false);
      });
  }, 100);

  const renderItem = ({item}) => (
    <Card imagen={item.image} nombre={item.name} />
  );
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          placeholder="Escribi un personaje..."
          style={styles.searchbar}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" animating={loading} />
      ) : (
        <FlatList
          style={({height: '100%'}, {width: '100%'})}
          key={item => item.id}
          onEndReached={this.setLoading}
          onEndReachedThreshold={50}
          data={characters}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
};

export default Screen1;

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
    marginTop: '3%',
    width: '90%',
    height: 50,
  },
  searchbar: {
    backgroundColor: 'white',
    height: 40,
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 20,
    placeholderTextColor: '#FFFFFF',
    clearIcon: {
      color: 'white',
      size: 21,
    },
  },
  separator: {
    width: '90%',
    height: 3,
    backgroundColor: 'white',
    borderRadius: 30,
    alignSelf: 'center',
  },
});
