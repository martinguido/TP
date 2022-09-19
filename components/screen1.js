import React, {useState} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';
import Card from './card';
import Icon from 'react-native-vector-icons/FontAwesome';

const Screen1 = () => {
  const [characters, setcharacters] = useState();
  const [loading, setLoading] = useState(true);
  const [text, onChangeText] = React.useState(null);
  const [next, setNext] = useState();

  setTimeout(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(response => response.json())
      .then(response => {
        setNext(response.info.next);
        setcharacters(response.results);
        setLoading(false);
      });
  }, 5000);

  const renderItem = ({item}) => (
    <Card imagen={item.image} nombre={item.name} />
  );

  const renderLoader = () => {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          style={styles.loaderactivity}
          size="large"
          color="grey"
        />
      </View>
    );
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
        <ActivityIndicator size="large" color="grey" animating={loading} />
      ) : (
        <FlatList
          style={({height: '100%'}, {width: '100%'})}
          key={item => item.id}
          onEndReachedThreshold={5}
          //onEndReached={this.setMoreData}
          data={characters}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={renderLoader}
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
