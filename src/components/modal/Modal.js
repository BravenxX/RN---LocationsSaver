import React from 'react';
import {Overlay} from 'react-native-elements';

const Modal = ({children, ...props}) => (
  <Overlay {...props}>{children}</Overlay>
);

export {Modal};
