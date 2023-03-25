/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { Layout, Button, Text, Loading, Header, CInput } from 'components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { scale } from 'device';
import { colors, fonts, images } from 'assets';
import { useDispatch, useSelector } from 'react-redux';
import AuthenticationRouter from 'navigation/AuthenticationNavigation/AuthenticationRouter';
import { navigate } from 'navigation/RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  loginAction,
  onCloseModalAuthenticationMessage,
} from 'redux_manager/authentication/authenticationReducer';
import { RootState } from 'redux_manager/base/allReducers';
import Modal from 'react-native-modal';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { allActions } from 'redux_manager';
import { Config } from 'utils';
import { getErrors } from 'utils/config';
import { Image } from 'react-native-elements';

const ForgotPassScreen = () => {
  const { isLoading, message, isError } = useSelector(
    (state: RootState) => state.authentication,
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [blSecurity, setBlSecurity] = useState(false);
  useEffect(() => {

  }, []);

  const onForgotPass=()=>{
    navigate(AuthenticationRouter.FORGOTPASS, {})
  }

  return (
    <Layout bgColor={colors.white} barStyle={'dark-content'}>
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colors.white }}
        contentContainerStyle={{ flex: 1 }}>
        <View style={{ alignItems: 'center', marginTop: '20%' }}>
          <Image source={images.logo} style={styles.logo} />
          <Text style={styles.textNormal}>Giải tỏ tinh thần - Thỏa mãn yêu thích</Text>
        </View>
        <View style={{ paddingHorizontal: scale(30) }}>
          <View style={{ marginTop: scale(15) }}>
            <CInput
              placeholder='Nhập số điện thoại/Email'
              valueText={userName}
              onChangeText={(text: string) => { setUserName(text) }}
            />
          </View>
         
          <Button onPress={() => setBlSecurity(!blSecurity)} style={styles.btn}>
            <Text bold style={styles.txtBtn}>Đăng nhập</Text>
          </Button>
         
        </View>

        <View>
        </View>
      </KeyboardAwareScrollView>

      {isLoading && <Loading />}
    </Layout>
  );
};

const styles = StyleSheet.create({
  titleHeader: {
    fontSize: scale(18),
    color: colors.white,
  },
  logo: {
    width: scale(200),
    height: scale(150),
    resizeMode: 'contain'
  },
  container: {
    flex: 1,
    borderTopLeftRadius: scale(22),
    borderTopRightRadius: scale(22),
    paddingHorizontal: scale(20),
    justifyContent: 'flex-start',
  },

  textNormal: {
    color: colors.textColor,
    textAlign: 'center',
    fontSize: scale(16),
    marginBottom: scale(10),
  },
  btnViewPass: {
    position: 'absolute',
    right: scale(0),
    bottom: scale(0),
    padding: scale(15)
  },
  iconViewPass: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain'
  },
  btn: {
    width: '100%',
    height: scale(48),
    backgroundColor: colors.mainColor,
    marginTop: scale(25),
    borderRadius: scale(5),
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtBtn: {
    color: colors.white,
    fontSize: scale(18)
  },
  txtForgot:{
    fontSize:scale(14)
  }
});

export default ForgotPassScreen;
