import React, {useEffect} from 'react';
import {View, FlatList, ActivityIndicator, Text} from 'react-native';
import Card from '../Card/index.js';
import styles from './favs_style.js';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCharactersRB} from '../reducers/counterSlice.js';

const Favs = ({navigation}) => {
  const dispatch = useDispatch();
  const {deviceID, charactersRB, loadingFav, fav} = useSelector(
    state => state.counter,
  );

  useEffect(() => {
    dispatch(fetchCharactersRB(deviceID));
  }, [dispatch, deviceID]);

  let characters = charactersRB;
  //console.log(characters[0].id);
  //console.log(charactersRB.length);
  const renderItem = ({item}) => (
    <Card
      showCom={true}
      id={item.id}
      imagen={item.imagen}
      nombre={item.nombre}
      estado={item.estado}
      especie={item.especie}
      genero={item.genero}
      origen={item.origen}
      ubicacion={item.ubicacion}
      comentario={item.comentario}
      fav= {true}
    />
  );

  return (
    <View style={styles.container}>
      {loadingFav ? (
        <ActivityIndicator size="large" color="grey" animating={loadingFav} />
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

export default Favs;
