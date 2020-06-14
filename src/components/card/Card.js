import React from 'react';
import {Card as ElementCard} from 'react-native-elements';

const Card = ({children, ...props}) => (
  <ElementCard {...props}>{children}</ElementCard>
);

export {Card};
