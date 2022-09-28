import React, {useState, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
  Text,
  Modal,
  TouchableOpacity
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
  const [showModal, setShowModal] = useState(false);
  const [colour, setColour] = useState('grey');
  const handleClick = (color) =>
      (
        setColour(color)
      );



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
    <View>
    <View style={styles.filtersContainer}>
    <TextInput
          placeholder="Type name..."
          placeholderTextColor="black"
          style={styles.searchName}
          value={search}
          onChangeText={text => filterByName(text)}
        />
    <TouchableOpacity style={styles.filter} onPress={() => setShowModal(true)}>
        <Text style= {styles.filterText}>Fltr</Text>
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
            <TouchableOpacity style={[styles.box, { backgroundColor: colour }]} title="Dead" /*onPressIn={() => handleClick('red')}*/ onPress={() => {filterByStats('Dead'),handleClick('red')}} >
              <Text>Dead</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box} title="Alive" onPress={() => filterByStats('Alive')}>
             <Text>Alive</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box} title="Unknown" onPress={() => filterByStats('Unknown')}>
              <Text>Unknown</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box} title="Cualquiera" onPress={() => filterByStats('')}>
              <Text>Any</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.text3}>Genre:</Text>
          <View style={styles.status2}>
            <TouchableOpacity style={styles.box2} title="Female" onPress={() => filterByGender('Female')}>
              <Text>Female</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box2} title="Male" onPress={() => filterByGender('Male')}>
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
            <TouchableOpacity style={styles.box2} title="Unknown" onPress={() => filterByGender('Unknown')}>
              <Text>Unknown</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box2} title="Cualquiera" onPress={() => filterByGender('')}>
              <Text>Any</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.close} onPress={() => setShowModal(false)}>
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
  x: {
    fontSize: 15,
    padding: 10,
    fontWeight: 'bold',
    borderColor: 'black',
    borderWidth: 3,
    alignSelf: 'center',
    backgroundColor: 'grey'

  },
  info: {
    fontSize: 20,
    padding: 10,
    marginLeft: 30, 
  },
  button: {
    marginBottom: 10,
    marginRight: 5,
    width: 50,
    height: 60,
    // alignItems: 'flex-end',
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 2,
    //marginLeft: 300,
    alignSelf: 'flex-end',
    //justifyContent: 'center',
    //textAlignVertical: 'center',
    borderRadius: 20,
  },
  buttonText: {
    padding: 10,
    alignSelf: 'center',
    color: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    //marginRight: 10,
    textAlignVertical: 'center',
  },

  filter: {
    marginTop:'15%',
    borderColor: 'black',
    alignSelf: 'flex-end',
    borderWidth: 3,
    width: '10%',
    justifyContent: 'flex-end',
    borderRadius: 15,
    backgroundColor: 'grey',
    marginHorizontal: '12%'


  },
  filterText: {
    alignSelf: 'center',
    fontSize: 20,
},  
inputContainer: {
  flexDirection: 'row',
  //justifyContent: 'space-around',
  borderColor: 'grey',
  borderWidth: 3,
  width: '100%',

  
},
text2: {
  padding: 5,
  //justifyContent:'left',
  marginLeft: 0,
  fontSize: 17,
  fontWeight: 'bold',
},
searchBar: {
  width: '70%',
},
text3: {
  alignSelf: 'flex-start',
  //alignContent: 't',
  padding: 5,
  fontSize: 17,
  fontWeight: 'bold',
  width: '30%',

},
status: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  justifyContent: 'flex-start',
},
box: {
  borderColor: 'black',
  borderWidth: 3,
  width: '24%',
  marginHorizontal: 2,
  padding: 10,
},
status2: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 10,
},
box2: {
  borderColor: 'black',
  borderWidth: 3,
  width: '32%',
  marginHorizontal: 2,
  padding: 10,
  
},
searchName: {
  backgroundColor: 'grey',
  width: '70%',
  height: 40,
  marginTop: 50,
  flexDirection: 'row',
    //width: "80%",
  backgroundColor: '#d9dbda',
  borderRadius: 15,

},
filtersContainer: {
  flexDirection: 'row',
  color:'grey',
  marginHorizontal: '4%'
  
}

});