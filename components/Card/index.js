import React, {memo, useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, Animated, Dimensions} from 'react-native';
import MyModal from '../Modal/index.js';
import styles from './card_style.js';
import {useDispatch, useSelector} from 'react-redux';
import {Icon} from 'react-native-elements';
import {uploadCharacter, deleteCharacter} from '../reducers/counterSlice.js';
import { transform } from '@babel/core';

const Card = props => {
  const {iconSize, deviceID, charactersRB} = useSelector(
    state => state.counter,
  );
  const [showModal, setShowModal] = useState(false);
  const [colorIcon, setColorIcon] = useState('white');
  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));
  const [slide, setSlide] = useState(new Animated.Value(0));
  const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);
  const dispatch = useDispatch();
  const width = Dimensions.get('window').width;

  const handleAnimation = () => {
    Animated.timing(rotateAnimation, {
      toValue: 100,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      rotateAnimation.setValue(0);
    });
  };

const handleSlide = () => {
  Animated.timing(slide, {
    toValue: 1,
    duration: 400,
    useNativeDriver: true,
  }).start(() => {
    slide.setValue(0);
    dispatch(deleteCharacter([props, deviceID]));
  });
  
};

  const disappear = slide.interpolate({
    inputRange: [0, 0.5,  1],
    outputRange: [ 0, 200,  width],
  });

  const rotate = rotateAnimation.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '360deg'],
  });


  useEffect(() => {
    var color = 'white';
    if (charactersRB !== undefined) {
      var i = 0;
      while (i < charactersRB.length) {
        if (charactersRB[i].id === props.id) {
          color = 'gold';
        }
        i++;
      }
      setColorIcon(color);
      //if (characterRB){}
    }
    //if (props.id )
    /*
    let dbRef = ref(db, 'characters/' + deviceID + '/' + props.id);
    onValue(dbRef, async snapshot => {
      charactersOff = await snapshot.val();
      if (charactersOff != null) {
        setColorIcon('gold');
      }
    });*/
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charactersRB]);
  /*
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
      comentario: '',
    });
  };
  */
  const updateDatabase = () => {
    if (colorIcon === 'white') {
      setColorIcon('gold');
      handleAnimation();
      dispatch(uploadCharacter([props, deviceID]));
    } else {
      handleSlide();
      handleAnimation();
      setColorIcon('white');
      //dispatch(deleteCharacter([props, deviceID]));
      
    }
  };
      /*if (props.fav === true) {

      } else {
        dispatch(deleteCharacter([props, deviceID]));
      }
 
    }
  };
  /*
  const deleteCharacter = () => {
    db = getDatabase();
    set(ref(db, 'characters/' + deviceID + '/' + props.id), null);
  };

  const updateDatabase = () => {
    if (colorIcon === 'white') {
      setColorIcon('gold');
      handleAnimation();
      uploadCharacter();
    } else {
      setColorIcon('white');
      deleteCharacter();
    }
  };
  */
  return (
    <Animated.View 
            style={ props.fav === true ?
              {transform: [{translateX: disappear}]} : 
              {}}>
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
    </Animated.View>
  );
};

export default memo(Card);
