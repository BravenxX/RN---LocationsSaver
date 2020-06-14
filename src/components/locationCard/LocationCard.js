import React from 'react';
import {StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';

const LocationCard = ({onRightIconPress, ...props}) => (
  <ListItem
    titleStyle={styles.listText}
    leftIcon={{
      name: 'send',
      type: 'ionicons',
      color: 'gray',
    }}
    rightIcon={{
      name: 'close',
      type: 'ionicons',
      color: 'gray',
      onPress: onRightIconPress,
    }}
    bottomDivider
    {...props}
  />
);

const styles = StyleSheet.create({
  listText: {
    color: 'gray',
  },
});
export {LocationCard};
