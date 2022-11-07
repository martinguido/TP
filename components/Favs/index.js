import React from 'react';
import {View, FlatList, ActivityIndicator, Text} from 'react-native';
import Card from '../Card/index.js';
import styles from './favs_style.js';
import {useDispatch, useSelector} from 'react-redux';
import {setCharactersRD} from '../reducers/counterSlice.js';

const Favs = ({navigation}) => {
  const dispatch = useDispatch();
  dispatch(setCharactersRD());
  const characters = useSelector(state => state.counter.charactersAPI);
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
    />
  );

  return (
    <View style={styles.container}>
      {useSelector(state => state.counter.loadingFav) ? (
        <ActivityIndicator
          size="large"
          color="grey"
          animating={useSelector(state => state.counter.loadingFav)}
        />
      ) : (
        <View style={styles.container2}>
          {useSelector(state => state.counter.fav) ? (
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
