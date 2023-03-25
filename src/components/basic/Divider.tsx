import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, fonts} from 'assets';
import {scale} from 'device';

const Divider = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line}></View>
      <View>
        <Text style={styles.text}>or</Text>
      </View>
      <View style={styles.line}></View>
    </View>
  );
};

export default Divider;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  line: {
    width: 149.1,
    height: 1,
    backgroundColor: colors.skyLight,
  },
  text: {
    textAlign: 'center',
    fontSize: scale(12),
    fontFamily: fonts.TTCommons.regular,
    color: colors.inkLighter
  },
});
