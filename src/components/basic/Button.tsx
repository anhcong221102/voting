import React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  Text,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
} from 'react-native';

interface Props {
  text?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
  onPress: (event: GestureResponderEvent) => void;
}
const Button = ({text, style, textStyle, onPress}: Props) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
