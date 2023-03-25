import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps,Image
} from 'react-native';

import { Text } from 'components';
import { colors, images } from 'assets';
import { scale } from 'device';
export type IProps = {
  name: string;
  label?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  values?: { [key: string]: any };
  errors?: { [key: string]: any };
  touched?: { [key: string]: any };
  handleBlur?: any;
  handleChange?: any;
  format?: (price: string) => string;
} & TextInputProps;

const Input = ({
  name,
  label,
  style,
  inputStyle,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  onBlur,
  format,
  ...rest
}: IProps) => {
  return (
    <View style={{marginTop:20}}>
      {label && (
        <Text semiBold style={styles.label}>
          {label}
        </Text>
      )}
      <TextInput
        value={values
          ? format ? format(values[name]) : values[name]
          : ''
        }
        allowFontScaling={false}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        style={[inputStyle, styles.vInput]}
        placeholderTextColor='#000000'
        {...rest}
      />
      {errors && touched && errors[name] && touched[name] ? (
        <Text style={styles.error}>{errors[name]}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: colors.cFFFFFF,
    fontSize: scale(14),
    marginTop:8
  },
  label: {
    fontSize: scale(18),
    marginBottom: scale(8),
    color:'#fff'
  },
  vInput: {
    minHeight: scale(48),
    color: '#000000'
  },
});

export default Input;
