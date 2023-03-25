import React from 'react';
import { TextProps, Text as RNText, StyleSheet } from 'react-native';
import { colors, fonts } from 'assets';
type TProps = {
  bold?: boolean;
  semiBold?: boolean;
  children?: React.ReactNode;
  numberOfLines?: number
} & TextProps;

const Text = ({ bold, semiBold, style, children, numberOfLines }: TProps) => {
  return (
    <RNText
      numberOfLines={numberOfLines || 200}
      style={[
        bold ? styles.bold : semiBold ? styles.semiBold : styles.normal,
        style,
      ]}>
      {children}
    </RNText>
  );
};

export default Text;

const styles = StyleSheet.create({
  bold: {
    fontFamily: fonts.TTCommons.bold,
    color: colors.textColor
  },
  semiBold: {
    fontFamily: fonts.TTCommons.demiBold,
    color: colors.textColor
  },
  normal: {
    fontFamily: fonts.TTCommons.regular,
    color: colors.textColor
  },
});
