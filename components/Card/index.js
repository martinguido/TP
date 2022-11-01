import React, {memo, useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, PixelRatio} from 'react-native';
import MyModal from '../Modal/index.js';
import styles from './card_style.js';
import app from '../connection.js';
import {onValue, set, ref, getDatabase} from 'firebase/database';

import {Icon} from 'react-native-elements';
let db = getDatabase(app);
let charactersOff = {};

const Card = props => {
  const [showModal, setShowModal] = useState(false);
  const [colorIcon, setColorIcon] = useState('white');
  const fontScale = React.useMemo(() => PixelRatio.getFontScale(), []);
  const defaultFontSize = 50;
  const iconSize = defaultFontSize * fontScale;
  //let deviceID = deviceInfo.getUniqueId()._j;
  const deviceID = 1000;
  useEffect(() => {
    let dbRef = ref(db, 'characters/' + deviceID + '/' + props.id);
    onValue(dbRef, async snapshot => {
      charactersOff = await snapshot.val();
      if (charactersOff != null) {
        setColorIcon('gold');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const uploadCharacter = () => {
    db = getDatabase();
    set(ref(db, 'characters/' + deviceID + '/' + props.id), {
      id: props.id,
      nombre: props.nombre,
      imagen: props.imagen,
      estado: props.estado,
      especie: props.especie,
      genero: props.genero,
      origen: props.origen,
      ubicacion: props.ubicacion,
    });
  };
  const deleteCharacter = () => {
    db = getDatabase();
    set(ref(db, 'characters/' + deviceID + '/' + props.id), null);
  };

  const updateDatabase = () => {
    if (colorIcon === 'white') {
      setColorIcon('gold');
      uploadCharacter();
    } else {
      setColorIcon('white');
      deleteCharacter();
    }
  };

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
          <TouchableOpacity
            style={styles.star}
            onPress={() => updateDatabase()}>
            <Icon name="star" color={colorIcon} size={iconSize} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(Card);
