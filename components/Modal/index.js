import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, PixelRatio} from 'react-native';
import styles from './modal_style.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-gesture-handler';
import app from '../connection.js';
import {ref, getDatabase, update} from 'firebase/database';
import {useDispatch, useSelector} from 'react-redux';
import {uploadComment} from '../reducers/counterSlice.js';
let db = getDatabase(app);

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
  const fontScale = React.useMemo(() => PixelRatio.getFontScale(), []);
  const defaultFontSize = 55;
  const iconSize = defaultFontSize * fontScale;
  const deviceID = 2000;
  

  const dispatch = useDispatch();

  const addComment = text => {

    dispatch(uploadComment([id, text, deviceID]));
    
    /*db = getDatabase();
    update(ref(db, 'characters/' + deviceID + '/' + id), {
      comentario: text,
    });*/
    setModalCommVisible(false);
    setComment('');
  };

  
  return (
    <Modal transparent={true} visible={showModal} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalCard}>
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
            <View>
              <Text style={styles.info}>Comentario: {comentario}</Text>
              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.close}
                  onPress={() => setModalCommVisible(true)}>
                  <Icon
                    name="edit"
                    color="white"
                    size={iconSize}
                    style={styles.icono2}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.close}
                  onPress={() => setShowModal(false)}>
                  <Icon
                    name="remove"
                    color="red"
                    size={iconSize}
                    style={styles.icono}
                  />
                </TouchableOpacity>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalCommVisible}>
                  <View style={styles.modalComment}>
                    <Text style={styles.text}>Add a comment</Text>
                    <View style={styles.separator2} />
                    <TextInput
                      placeholder="Add a comment..."
                      placeholderTextColor="grey"
                      style={styles.commentInput}
                      value={comment}
                      onChangeText={text => setComment(text)}
                    />
                    <View style={styles.footerComment}>
                      <TouchableOpacity
                        style={styles.add}
                        onPress={() => addComment(comment)}>
                        <Icon
                          name="plus"
                          color="white"
                          size={iconSize}
                          style={styles.iconoComment}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.close}
                        onPress={() => setModalCommVisible(false)}>
                        <Icon
                          name="remove"
                          color="red"
                          size={iconSize}
                          style={styles.icono2Comment}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default MyModal;
