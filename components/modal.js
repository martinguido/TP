import React, {memo, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Button, Alert, Modal, ProgressViewIOSComponent} from 'react-native';
import { withTheme } from 'react-native-elements';

const MyModal = ({estado, especie, genero, origen, ubicacion, showModal, setShowModal})=> {

  
  return (

        <Modal transparent={true} visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
            <Text style={styles.title}>Details</Text>
            <Text style={styles.info} >Genre: {genero}</Text>
            <Text style={styles.info} >Species: {especie}</Text>
            <Text style={styles.info} >Status: {estado}</Text>
            <Text style={styles.info} >Origin: {origen}</Text>
            <Text style={styles.info} >Location: {ubicacion}</Text>
            <TouchableOpacity style={styles.close} onPress={() => setShowModal(false)}>
              <Text style={styles.x}>close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
  );
};

export default MyModal
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '80%',
    height: '50%',
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 7,
    borderRadius: 30,
    justifyContent: 'center',
    //alignItems: 'center',
  },
  close: {
    justifyContent: 'center',
    alignItems: 'center',
    //height: 300,
    //width: 300,
    display: 'flex',
    

  },
  x: {
    fontSize: 15,
    padding: 10,
    fontWeight: 'bold',
    borderColor: 'white',
    borderWidth: 3,
    color: 'white',

  },
  info: {
    fontSize: 20,
    padding: 10,
    marginLeft: 30, 
    color: 'white',
  },
  title: {
    alignSelf: 'center',
    fontSize: 30,
    color: 'white',
    padding: 10,

  },
    
});
