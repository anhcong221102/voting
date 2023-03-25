import React, { useState, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { scale } from 'device';
import {
  colors,
  fonts,

} from 'assets';
import { Col, Row } from 'components';
import moment from 'moment';
import { Config } from 'utils'
import Toast from 'react-native-toast-message';

interface Props {
  data: any;
}

function NovelItem({ data }: Props) {
  ;


  return (
    <View
      style={styles.container}>
      <View style={styles.childContent}>
        <View>
          <Text style={styles.txtHeader}>{data?.title}</Text>
        </View>
      </View>
    </View>
  );
}

export default NovelItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(10),
    width: '100%'
  },
  childContent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: colors.gray,
    borderBottomWidth: scale(1),
    paddingBottom: scale(12),
    paddingHorizontal: scale(20)

  },
  avatar: {
    width: scale(45),
    height: scale(45),
    borderRadius: scale(45 / 2),
    backgroundColor: colors.gray,
    marginRight: scale(10),
  },
  txtHeader: {
    fontSize: scale(14),
    fontFamily: fonts.TTCommons.demiBold,
    color: colors.black,
  },
 
  txtNormal: {
    fontSize: scale(16),
    fontFamily: fonts.TTCommons.regular,
    color: colors.gray,
    marginTop: scale(2),
  },
 
});
