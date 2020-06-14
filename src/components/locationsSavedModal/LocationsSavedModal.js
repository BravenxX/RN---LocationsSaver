import React from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';

import {Modal, LocationCard} from '../';

const LocationsSavedModal = ({
  isVisible,
  locations,
  goToLocation,
  removeLocationSaved,
  closeModal,
}) => (
  <Modal overlayStyle={styles.modal} isVisible={isVisible}>
    <>
      <Text style={styles.title}>Localizaciones</Text>

      <ScrollView style={styles.scrollView}>
        {locations.length ? (
          locations.map((location, index) => (
            <LocationCard
              key={index}
              title={location.name}
              onPress={() => goToLocation(location)}
              onRightIconPress={() => removeLocationSaved(index, location)}
            />
          ))
        ) : (
          <Text style={styles.text}>No tienes localizaciones guardadas.</Text>
        )}
      </ScrollView>
      <Button
        buttonStyle={styles.button}
        title="Aceptar"
        onPress={closeModal}
      />
    </>
  </Modal>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 19,
    color: 'gray',
    alignSelf: 'center',
    padding: 10,
  },
  scrollView: {
    height: 200,
  },
  modal: {
    width: '70%',
  },
  text: {
    color: 'gray',
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'gray',
  },
});

export {LocationsSavedModal};
