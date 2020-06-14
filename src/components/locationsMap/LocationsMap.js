import React from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const LocationsMap = ({latLong, marks = [], ...props}) => (
  <MapView
    provider={PROVIDER_GOOGLE}
    region={
      latLong && {
        latitude: latLong.latitude,
        longitude: latLong.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    }
    {...props}>
    {marks.map((marker, index) => (
      <Marker
        key={index}
        coordinate={marker.latlng}
        title={marker.title}
        description={marker.description}
      />
    ))}
  </MapView>
);

export {LocationsMap};
