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
    <TouchableOpacity style={styles.filter} onPress={() => setShowModal(true)}>
        <Text style= {styles.filterText}>Filter</Text>
    </TouchableOpacity>

    <View>
      <Modal transparent={true} visible={showModal} animationType="slide">
      <View style={styles.container2}>
        <View style={styles.inputContainer}>
        <Text style={styles.text2}>Nombre:</Text>
        <TextInput
          placeholder="Escriba el nombre aca..."
          placeholderTextColor="black"
          style={styles.searchBar}
          value={search}
          onChangeText={text => filterByName(text)}
        />
        </View>
        <View style={styles.inputContainer}>
        <Text style={styles.text2}>Especie:</Text>
        <TextInput
          placeholder="Escriba la especie aca..."
          placeholderTextColor="black"
          style={styles.searchBar}
          value={species}
          onChangeText={s => filterBySpecies(s)}
        />
        </View>
        <View style={styles.inputContainer}>
        <Text style={styles.text2}>Tipo:</Text>
        <TextInput
          placeholder="Escriba el tipo aca..."
          placeholderTextColor="black"
          style={styles.searchBar}
          value={type}
          onChangeText={t => filterByType(t)}
        />
        </View>
       
        <View>

          <Text style={styles.text3}>Estado</Text>
          <View style={styles.status}>
            <TouchableOpacity style={styles.box} title="Dead" onPress={() => filterByStats('Dead')}>
              <Text>Dead</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box} title="Alive" onPress={() => filterByStats('Alive')}>
             <Text>Alive</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box} title="Unknown" onPress={() => filterByStats('Unknown')}>
              <Text>Unknown</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box} title="Cualquiera" onPress={() => filterByStats('')}>
              <Text>Cualquiera</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.text3}>Genero</Text>
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
      <TouchableOpacity style={styles.close} onPress={() => setShowModal(false)}>
              <Text style={styles.x}>Apply</Text>
      </TouchableOpacity>
      </Modal>
      </View>
      </View>
      

      {loading ? (
        <ActivityIndicator size="large" color="grey" animating={loading} />
      ) : (
        <FlatList
          style={({height: '100%'}, {width: '100%'})}
          keyExtractor={(item, index) => String(item.id + index)}
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
    fontSize: 30,
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
    alignSelf: 'center',
    borderWidth: 3,
    width: 200,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'grey',

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
  padding: 10,
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
  padding: 10,
  fontSize: 17,
  fontWeight: 'bold',
  width: '30%',

},
status: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  justifyContent: 'center',
},
box: {
  borderColor: 'black',
  borderWidth: 3,
  width: '24%',
  marginHorizontal: 2,
  
  
  padding: 10,

}

});