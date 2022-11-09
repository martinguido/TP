import React, {memo, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  PixelRatio,
  Animated,
} from 'react-native';
import MyModal from '../Modal/index.js';
import styles from './card_style.js';
import app from '../connection.js';
import {onValue, set, ref, getDatabase} from 'firebase/database';
import {useDispatch, useSelector} from 'react-redux';
import {uploadCharacter, deleteCharacter} from '../reducers/counterSlice.js';
import {Icon} from 'react-native-elements';
let db = getDatabase(app);
let charactersOff = {};

const Card = props => {
  const {deviceID} = useSelector(state => state.counter);

  const [showModal, setShowModal] = useState(false);
  const [colorIcon, setColorIcon] = useState('white');
  const fontScale = React.useMemo(() => PixelRatio.getFontScale(), []);
  const defaultFontSize = 50;
  const iconSize = defaultFontSize * fontScale;
  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));



  const dispatch = useDispatch();


  const handleAnimation = () => {
    Animated.timing(rotateAnimation, {
      toValue: 100,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      rotateAnimation.setValue(0);
    });
    //console.log('animating')
  };

  const rotate = rotateAnimation.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '360deg'],
  });

  //let deviceID = deviceInfo.getUniqueId()._j;
  //const deviceID = 2000;
  useEffect(() => {
    let dbRef = ref(db, 'characters/' + deviceID + '/' + props.id);
    onValue(dbRef, async snapshot => {
      charactersOff = await snapshot.val();
      if (charactersOff != null) {
        setColorIcon('gold');
      }
      else {
      setColorIcon('white');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const uploadCharacterDB = () => {
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
      comentario: '',
    });
  };
  const deleteCharacterDB = () => {
    db = getDatabase();
    set(ref(db, 'characters/' + deviceID + '/' + props.id), null);
  };

  const updateDatabase = () => {
    if (colorIcon === 'white') {
      setColorIcon('gold');
      handleAnimation();
      console.log(props);
      let info = props;
      dispatch(uploadCharacter([info, deviceID]));
      //uploadCharacter();
    } else {
      setColorIcon('white');
      dispatch(deleteCharacter([props, deviceID]));
      //deleteCharacter();
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
            showCom={props.showCom}
            id={props.id}
            estado={props.estado}
            especie={props.especie}
            genero={props.genero}
            origen={props.origen}
            ubicacion={props.ubicacion}
            comentario={props.comentario}
            showModal={showModal}
            setShowModal={setShowModal}
          />
          <TouchableOpacity
            style={styles.star}
            onPress={() => {
              updateDatabase();
            }}>
            <Animated.View style={{transform: [{rotate: rotate}]}}>
              <Icon name="star" color={colorIcon} size={iconSize} />
            </Animated.View>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(Card);
