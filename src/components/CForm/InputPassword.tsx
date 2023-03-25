import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors } from 'assets';
import Input, { IProps } from './Input';
import { Button } from 'components';
import { scale } from 'device';

const InputPassword = ({ inputStyle, ...rest }: IProps) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleSecure = () => {
    setSecureTextEntry(prev => !prev);
  };

  return (
    <View>
      <Input
        {...rest}
        {...{ secureTextEntry }}
        inputStyle={[styles.input, inputStyle]}
      />
      <Button style={styles.btnEye} onPress={handleSecure}>
        <Ionicons
          size={18}
          name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
          color={colors.c000000}
        />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  btnEye: {
    position: 'absolute',
    right: 0,
    top: scale(68),
    paddingRight: scale(12),
  },
  input: {
    paddingRight: scale(48),
  },
});

export default InputPassword;
