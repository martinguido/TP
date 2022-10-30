import React, {useState, useEffect} from 'react';
import {View, FlatList, PixelRatio} from 'react-native';
import Card from '../Card/index.js';

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
    <View>
      <FlatList
        style={({height: '100%'}, {width: '100%'})}
        keyExtractor={item => item.id}
        data={characters}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View />}
        onEndReachedThreshold={0.5}
        onEndReached={setMoreData}
      />
    </View>
  );
};

export default Home;
