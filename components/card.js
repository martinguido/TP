import React, {memo, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Button, Alert, Modal, ProgressViewIOSComponent} from 'react-native';
import { color } from 'react-native-elements/dist/helpers';

const Card = props => {

  const [showModal, setShowModal] = useState(false);



  return (
    <View style={styles.card}>
      <Image style={styles.image} source={{uri: props.imagen}} />
      <TouchableOpacity style={styles.overlay}>
        <Text style={styles.text}>{props.nombre}</Text>
        <View style={styles.fixToText}>
        <Button
          title="Right button"
          onPress={() => setShowModal(true)}>
          style={styles.button}>
        </Button>
        <Modal transparent={true} visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
            
            <Text>Genero: {props.genero}</Text>
            <Text>Especie: {props.especie}</Text>
            <Text>Estado: {props.estado}</Text>
            <Text style={styles.close} onPress={() => setShowModal(false)}>Cerrar</Text>
          </View>
        </View>
      </Modal>
      </View>
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
    marginBottom: '25%',
    marginHorizontal: '7%',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0)',
    fontWeight: 'bold',
  },
  overlay: {
    height: '25%',
    width: '100%',
    marginTop: '87%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    color: 'red',
    backgroundColor: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '80%',
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: '',
  },
  close: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 300,
    width: 300,
    margin: 10,
    display: 'flex',
  }
    
});
