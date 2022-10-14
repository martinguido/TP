import React, {memo, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import MyModal from '../Modal/index.js';
import styles from './card_style.js';

const Card = props => {
  const [showModal, setShowModal] = useState(false);
  /*
  <TouchableOpacity onPress={() => setShowModal(true)}>
  <View style={styles.button} />
</TouchableOpacity>
<View>
*/
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={{uri: props.imagen}} />
      <View style={styles.card_overlay}>
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setShowModal(true)}>
          <Text style={styles.text}>{props.nombre}</Text>
          <MyModal
            estado={props.estado}
            especie={props.especie}
            genero={props.genero}
            origen={props.origen}
            ubicacion={props.ubicacion}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(Card);
