import React, {useState, useEffect} from 'react';
import {View, FlatList, ActivityIndicator, Text} from 'react-native';
import Card from '../Card/index.js';
import app from '../connection.js';
import {onValue, ref, getDatabase} from 'firebase/database';
import styles from './favs_style.js';

let db = getDatabase(app);
let charactersOff = {};

const Home = ({navigation}) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fav, setFav] = useState(false);

  const deviceID = 1000;
  useEffect(() => {
    let dbRef = ref(db, 'characters/' + deviceID + '/');
    onValue(dbRef, async snapshot => {
      charactersOff = await snapshot.val();
      if (charactersOff != null) {
        if (Array.isArray(charactersOff)) {
          var i = 0;
          while (i < charactersOff.length) {
            if (charactersOff[i] === undefined || charactersOff[i] === null) {
              charactersOff.splice(i, 1);
            } else {
              ++i;
            }
          }
          console.log(charactersOff);
          setCharacters(charactersOff);
          setLoading(false);
          setFav(true);
        } else {
          console.log('NO ES UN ARREGLO');
          setCharacters(Object.values(charactersOff));
          console.log(characters);
          setLoading(false);
          setFav(true);
        }
      } else {
        setFav(false);
        setLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({item}) => (
    <Card
      id={item.id}
      imagen={item.imagen}
      nombre={item.nombre}
      estado={item.estado}
      especie={item.especie}
      genero={item.genero}
      origen={item.origen}
      ubicacion={item.ubicacion}
    />
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="grey" animating={loading} />
      ) : (
        <View style={styles.container2}>
          {fav ? (
            <FlatList
              style={({height: '100%'}, {width: '100%'})}
              keyExtractor={item => item.id}
              data={characters}
              renderItem={renderItem}
              ItemSeparatorComponent={() => <View />}
            />
          ) : (
            <Text style={styles.text}>No hay elementos faveados</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default Home;
