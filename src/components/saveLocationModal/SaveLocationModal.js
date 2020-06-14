import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Input} from 'react-native-elements';

import {Modal} from '../';

const SaveLocationModal = ({
  isVisible,
  name,
  onChangeName,
  onPressAccept,
  OnPressCancel,
}) => (
  <Modal isVisible={isVisible} overlayStyle={styles.modal}>
    <View>
      <Input label="Nombre" value={name} onChangeText={onChangeName} />
      <View style={styles.bottomButtons}>
        <Button title="Aceptar" onPress={onPressAccept} />
        <Button title="Cancelar" onPress={OnPressCancel} />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modal: {
    width: '70%',
  },
});

export {SaveLocationModal};
