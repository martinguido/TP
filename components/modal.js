import React from 'react';
import {View, Text, TouchableOpacity, Modal, PixelRatio} from 'react-native';
import styles from './Modal_component.style.js';
import Icon from 'react-native-vector-icons/FontAwesome';

const MyModal = ({
  estado,
  especie,
  genero,
  origen,
  ubicacion,
  showModal,
  setShowModal,
}) => {
  const fontScale = React.useMemo(() => PixelRatio.getFontScale(), []);
  const defaultFontSize = 55;
  const iconSize = defaultFontSize * fontScale;

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
          <TouchableOpacity
            style={styles.close}
            onPress={() => setShowModal(false)}>
            <Icon
              name="remove"
              color="red"
              size={iconSize}
              style={{marginTop: '5%'}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default MyModal;
