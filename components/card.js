import React, {memo, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Button, Alert, Modal, ProgressViewIOSComponent} from 'react-native';
import { fonts } from 'react-native-elements/dist/config';
import { color } from 'react-native-elements/dist/helpers';
import MyModal from './modal'

const Card = props => {

  const [showModal, setShowModal] = useState(false);



  return (
    <View style={styles.card}>
      <Image style={styles.image} source={{uri: props.imagen}} />
      <TouchableOpacity style={styles.overlay}>
        <Text style={styles.text}>{props.nombre}</Text>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <View style={styles.button}>  
          <Text style={styles.buttonText}>+</Text>  
          </View>
      </TouchableOpacity>
      <View>
        <MyModal estado={props.estado} especie={props.especie} genero={props.genero} origen={props.origen} ubicacion={props.ubicacion} showModal= {showModal} setShowModal= {setShowModal}/>
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
    marginBottom: 10,  
    marginRight: 5, 
    width: 50,
    height: 60,
   // alignItems: 'flex-end',  
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 2,
    //marginLeft: 300,
    alignSelf: 'flex-end',
    //justifyContent: 'center',
    //textAlignVertical: 'center',
    borderRadius: 20,
    
  },  
    buttonText: {  
    padding: 10,  
    alignSelf: 'center',
    color: 'white',  
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    fontWeight: "bold",
    fontSize: 20, 
    //marginRight: 10,
    textAlignVertical: 'center',
    
  },  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '80%',
    height: '50%',
    backgroundColor: 'lightgrey',
    borderColor: 'black',
    borderWidth: 10,
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
    fontSize: 30,
    padding: 10,
    fontWeight: 'bold',
    borderColor: 'black',
    borderWidth: 3,

  },
  info: {
    fontSize: 20,
    padding: 10,
    marginLeft: 30, 
  }
    
});
