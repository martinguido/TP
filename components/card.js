import React, {memo} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const Card = props => {
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={{uri: props.imagen}} />
      <TouchableOpacity style={styles.overlay}>
        <Text style={styles.text}>{props.nombre}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(Card);
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
    marginTop: '2%',
    marginHorizontal: '7%',
    fontSize: 30,
    flex: 1,
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0)',
    fontWeight: 'bold',
  },
  overlay: {
    height: 135,
    width: '100%',
    flexDirection: 'column',
    marginTop: 305,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    textAlignVertical: 'center',
  },
});
