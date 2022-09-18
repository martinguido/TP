import React, {useState} from 'react';
import {View, ActivityIndicator, StyleSheet, FlatList} from 'react-native';
import Card from './card';

const Screen4 = () => {
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
    <Card i={item} imagen={item.image} nombre={item.name} />
  );
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" animating={loading} />
      ) : (
        <FlatList
          style={({height: '100%'}, {width: '100%'})}
          key={item => item.id}
          data={characters}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
};

export default Screen4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    width: '90%',
    height: 3,
    backgroundColor: 'white',
    borderRadius: 30,
    alignSelf: 'center',
  },
});
