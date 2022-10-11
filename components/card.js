import React, {memo, useState} from 'react';
import {View, Text, Image, TouchableOpacity, PixelRatio} from 'react-native';
import MyModal from './modal';
import styles from './Card_component.style.js';
import Icon from 'react-native-vector-icons/FontAwesome';

const Card = props => {
  const [showModal, setShowModal] = useState(false);
  const fontScale = React.useMemo(() => PixelRatio.getFontScale(), []);
  const defaultFontSize = 22;
  const iconSize = defaultFontSize * fontScale;
  //<Icon name="info" color="white" size={iconSize} />
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={{uri: props.imagen}} />
      <View style={styles.card_overlay}>
        <TouchableOpacity style={styles.overlay}>
          <Text style={styles.text}>{props.nombre}</Text>
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <View style={styles.button}></View>
          </TouchableOpacity>
          <View>
            <MyModal
              estado={props.estado}
              especie={props.especie}
              genero={props.genero}
              origen={props.origen}
              ubicacion={props.ubicacion}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(Card);
