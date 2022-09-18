import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const Card = props => {
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={{uri: props.imagen}} />
      <TouchableOpacity style={styles.overlay} />
      <Text style={styles.text}>{props.nombre}</Text>
    </View>
  );
};

export default Card;
const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    width: '85%',
    height: 400,
    marginVertical: '7.5%',
    marginHorizontal: '2.5%',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 30,
  },
  text: {
    position: 'absolute',
    marginTop: 325,
    marginHorizontal: '7%',
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    opacity: 1,
  },
  overlay: {
    height: 135,
    width: '100%',
    marginTop: 305,
    backgroundColor: '#000000',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    opacity: 0.3,
  },
});
