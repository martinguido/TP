import React, {memo, useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, PixelRatio} from 'react-native';
import MyModal from '../Modal/index.js';
import styles from './card_style.js';
import app from '../connection.js';
import {onValue, set, ref, getDatabase, remove} from 'firebase/database';

import deviceInfo from 'react-native-device-info';
import {Icon} from 'react-native-elements';
let db = getDatabase(app);
let charactersOff = {};

const Card = props => {
  const [showModal, setShowModal] = useState(false);
  const [colorIcon, setColorIcon] = useState('white');
  const [modified, setModified] = useState(0);
  const fontScale = React.useMemo(() => PixelRatio.getFontScale(), []);
  const defaultFontSize = 50;
  const iconSize = defaultFontSize * fontScale;
  useEffect(() => {
    const deviceID = deviceInfo.getUniqueId()._j;
    if (deviceID != null) {
      let dbRef = ref(db, 'characters/' + deviceID + '/' + props.id);
      onValue(dbRef, async snapshot => {
        charactersOff = await snapshot.val();
        //console.log(dbRef);
        console.log(charactersOff);
        if (charactersOff != null) {
          console.log('Se actualiza' + props.id);
          setColorIcon('yellow');
        }

        //charactersOff.shift();
        //onsole.log(charactersOff);
      });
      setModified(prev => prev);
    }
  }, [modified, props.id]);
  const uploadCharacter = (props, deviceID) => {
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
    console.log('Character agregada correctamente');
  };
  const deleteCharacter = (props, deviceID) => {
    db = getDatabase();
    /*ref(db, 'characters/' + deviceID + '/' + props.id)
      .child(props.id)
      .remove();*/
    set(ref(db, 'characters/' + deviceID + '/' + props.id), null);
  };
  const updateDatabase = props => {
    const deviceID = deviceInfo.getUniqueId()._j;
    if (modified % 2 == 0 && deviceID != null) {
      setColorIcon('gold');
      uploadCharacter(props, deviceID);
      setModified(prev => prev + 1);
    } else {
      if (deviceID != null) {
        setColorIcon('white');
        deleteCharacter(props, deviceID);
        console.log('Character eliminado correctamente');
        setModified(prev => prev + 1);
      }
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
            onPress={() => updateDatabase(props)}>
            <Icon name="star" color={colorIcon} size={iconSize} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(Card);
