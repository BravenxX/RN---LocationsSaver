import React, {useState, useEffect} from 'react';
import {View, StyleSheet, StatusBar, Alert} from 'react-native';
import R from 'ramda';

import {Colors} from '../../UI';
import {
  SaveLocationModal,
  LocationsSavedModal,
  Icon,
  LocationsMap,
} from '../../components';
import {saveLocation, removeLocation, getLocations} from '../../functions';

const LocatorMap = () => {
  const [coordinateSelected, setCoordinatesSelected] = useState(null);
  const [locationName, setLocationName] = useState('');

  const [showSaveLocationModal, setShowSaveLocationModal] = useState(false);
  const [showLocationSavedModal, setShowLocationSavedModal] = useState(false);

  const [locationsSaved, setLocationsSaved] = useState([]);

  useEffect(() => {
    getLocationsSaved();
  }, []);

  const getLocationsSaved = async () => {
    try {
      await R.pipeP(
        getLocations,
        setLocationsSaved,
      )();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const onPressMap = ({nativeEvent}) => {
    R.pipe(
      setCoordinatesSelected,
      () => setShowSaveLocationModal(true),
    )(nativeEvent.coordinate);
  };

  const onPressLocationSaved = () => setShowLocationSavedModal(true);

  const onSaveLocation = async () => {
    const {latitude, longitude} = coordinateSelected;

    try {
      await R.pipeP(
        saveLocation,
        getLocationsSaved,
      )({name: locationName, latitude, longitude});
    } catch (error) {
      Alert.alert('Error', error.message);
    }

    setLocationName('');
    setCoordinatesSelected(null);
    setShowSaveLocationModal(false);
  };

  const onCancelSaveLocation = () => setShowSaveLocationModal(false);

  const goToLocation = ({latitude, longitude}) => {
    R.pipe(
      setCoordinatesSelected,
      () => setShowLocationSavedModal(false),
    )({latitude, longitude});
  };

  const onRemoveLocation = async (_, location) => {
    try {
      await R.pipeP(
        removeLocation,
        getLocationsSaved,
      )(location);
    } catch (error) {
      Alert('Error', error.message);
    }
  };

  return (
    <>
      <StatusBar backgroundColor={'black'} />

      <View style={styles.container}>
        <Icon
          raised
          name="star"
          type="ionicons"
          color={Colors.secundaryColor.normal}
          size={30}
          onPress={onPressLocationSaved}
          containerStyle={styles.floatIcon}
        />

        <LocationsMap
          style={styles.map}
          onPress={onPressMap}
          marks={locationsSaved.map(({name, longitude, latitude}) => ({
            latlng: {
              latitude,
              longitude,
            },
            title: name,
          }))}
          latLong={
            coordinateSelected && {
              latitude: coordinateSelected?.latitude,
              longitude: coordinateSelected?.longitude,
            }
          }
        />
      </View>

      <LocationsSavedModal
        isVisible={showLocationSavedModal}
        locations={locationsSaved}
        goToLocation={goToLocation}
        closeModal={() => setShowLocationSavedModal(false)}
        removeLocationSaved={onRemoveLocation}
      />

      <SaveLocationModal
        isVisible={showSaveLocationModal}
        name={locationName}
        onChangeName={setLocationName}
        onPressAccept={onSaveLocation}
        OnPressCancel={onCancelSaveLocation}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  floatIcon: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: '3%',
    zIndex: 1,
  },
});

export default LocatorMap;
