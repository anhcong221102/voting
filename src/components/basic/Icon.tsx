import React from 'react';
import {ImageSourcePropType, View, StyleSheet} from 'react-native';
import {Image} from 'react-native-elements';
import {colors} from 'assets';

interface Props {
  source: ImageSourcePropType;
}

const Icon = ({source}: Props) => {
  return (
    <View style={styles.container}>
      <Image source={source} />
    </View>
  );
};

export default Icon;

const styles = StyleSheet.create({
  container: {
    width: 56,
    height: 56,
    backgroundColor: colors.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
