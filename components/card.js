import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Card = props => {
  return (
    <View style={styles.card}>
      <ImageBackground
        style={styles.image}
        imageStyle={{borderRadius: 30}}
        source={{uri: props.imagen}}>
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.linearGradient}
        />
      </ImageBackground>
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
    marginTop: 65,
    marginHorizontal: 20,
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
});
