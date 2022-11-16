import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import styles from './modal_style.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {uploadComment} from '../reducers/counterSlice.js';

const MyModal = ({
  showCom,
  id,
  estado,
  especie,
  genero,
  origen,
  ubicacion,
  comentario,
  showModal,
  setShowModal,
}) => {
  const [modalCommVisible, setModalCommVisible] = useState(false);
  const [comment, setComment] = useState('');
  const [writeComment, setWriteComment] = useState('');
  const iconSize = useSelector(state => state.counter.iconSize);
  const deviceID = useSelector(state => state.counter.deviceID);

 


  const dispatch = useDispatch();

  const addComment = text => {
    dispatch(uploadComment([id, text, deviceID]));
    setModalCommVisible(false);
    setComment('');
  };

 
  /*
  const addComment = text => {
    db = getDatabase();
    update(ref(db, 'characters/' + deviceID + '/' + id), {
      comentario: text,
    });
    setModalCommVisible(false);
    setComment('');
  };*/

  return (
    <Modal transparent={true} visible={showModal} animationType="slide">
      <View style={styles.modalContainer}>
        <View style= {writeComment === true?
          [styles.modalCard,{height: '90%'}] :
          [{height: '60%'}, styles.modalCard]
          }>
          <Text style={styles.title}>Details</Text>
          <View style={styles.separator} />
          <Text style={styles.info}>Genre: {genero}</Text>
          <Text style={styles.info}>Species: {especie}</Text>
          <Text style={styles.info}>Status: {estado}</Text>
          <Text style={styles.info}>Origin: {origen}</Text>
          <Text style={styles.info}>Location: {ubicacion}</Text>
          {!showCom ? (
            <View style={styles.footer2}>
              <TouchableOpacity
                style={styles.close}
                onPress={() => setShowModal(false)}>
                <Icon
                  name="remove"
                  color="red"
                  size={iconSize}
                  style={styles.icono2Comment}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style= {styles.pepa}>
              <Text style={styles.info}>Comentario: {comentario}</Text>
              {writeComment === true ? (
              <View >
              <View style = {styles.comments}>
              <TextInput 
                      placeholder="Add a comment..."
                      placeholderTextColor="grey"
                      style={styles.commentInput}
                      value={comment}
                      onChangeText={text => setComment(text)}

                  />
                </View>
                <View style = {styles.hola}>
                  <TouchableOpacity
                  style={styles.add}
                  onPress={() => addComment(comment)}
                  >
                  <Text style= {styles.text2} >Add</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.close2}
                  onPress={() => setWriteComment(false)}
                  >
                  <Text style= {styles.text2} >Close</Text>
                </TouchableOpacity>
                
                </View>
                </View>
                    
                  
                  
              ) : (
                <View></View>
              )}
              
              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.close}
                  onPress={() => setWriteComment(true)}>
                  <Icon
                    name="edit"
                    color="white"
                    size={iconSize}
                    style={styles.icono2}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.close}
                  onPress={() => [setShowModal(false), setWriteComment(false)]}>
                  <Icon
                    name="remove"
                    color="red"
                    size={iconSize}
                    style={styles.icono}
                  />
                </TouchableOpacity>
                </View>
               
                
              
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default MyModal;
