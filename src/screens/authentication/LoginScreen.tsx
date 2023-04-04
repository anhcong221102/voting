/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Platform, ImageBackground, ScrollView } from 'react-native';
import { Layout, Button, Text, Loading, Header, CInput } from 'components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { device, scale } from 'device';
import { colors, fonts, IconFintger, images } from 'assets';
import { useDispatch, useSelector } from 'react-redux';
import AuthenticationRouter from 'navigation/AuthenticationNavigation/AuthenticationRouter';
import { navigate } from 'navigation/RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  loginAction,
  onCloseModalAuthenticationMessage,
  changeBiometryType,
  changeIsSupport,
} from 'redux_manager/authentication/authenticationReducer';
import TouchID from 'react-native-touch-id';
import Modal from 'react-native-modal';

import { useNavigation, CommonActions } from '@react-navigation/native';
import { allActions } from 'redux_manager';
import { Config } from 'utils';
import { getErrors } from 'utils/config';
import { Image } from 'react-native-elements';
import MainStackRouter from 'navigation/MainStackNavigation/MainStackRouter';
import { ThemeContext } from "assets/theme/ThemeContext";

const LoginScreen = () => {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');
  const [pinCode, setPinCode] = useState('');
  const isSupport = useSelector((state: any) => state.authentication.isSupport);
  const biometryType = useSelector((state: any) => state.authentication.biometryType);
  const [blSecurity, setBlSecurity] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme } = useContext(ThemeContext);
  const styles = style(theme);

  const A = 'A';
  const B = 'B';
  const C = 'C';
  const [blPage, setblPage] = useState(A);

  const optionalConfigObject = {
    // title: 'Authentication Required', // Android
    imageColor: colors.mainColor, // Android
    imageErrorColor: colors.red, // Android
    sensorDescription: '', // Android
    fallbackLabel: '', // iOS (if empty, then label is hidden)
    unifiedErrors: true, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };
  useEffect(() => {
    try {
      TouchID.isSupported()
        .then(res => {
          if (res === 'TouchID' || res === 'FaceID' || !!res) {
            // setBioMetryType(res);
            dispatch(changeBiometryType(res));
            dispatch(changeIsSupport(true));
          } else {
            dispatch(changeBiometryType(''));
            dispatch(changeIsSupport(false));
          }
        })
        .catch(err => {
          dispatch(changeBiometryType(''));
          dispatch(changeIsSupport(false));
        });
      return;
    } catch (error: any) {
    }
  }, []);

  const doLoginWithBiometry = (res?: string | boolean) => {
    try {
      TouchID.authenticate(
        `Sử dụng Vân tay/Khuôn mặt để mở khoá ứng dụng`
        ,
        {
          ...optionalConfigObject,
          title: `Đăng nhập TruyenFree`
          ,
          sensorErrorDescription: 'Thất bại', // Android
          cancelText: 'Huỷ', // Android
        },
      )
        .then(async (result: any) => {
          if (result) {
            goToHome();
           /*  const account = await getAccount();
            if (account) {
              setUserName(account.username);
              setPass(account.password);
              goToHome(); 
            }
          */}
        })
        .catch((err: any) => { });
      return;
    } catch (error: any) { }
  };
  const goToHome = () => {
    console.log('có vào đây');
    navigation.dispatch(
      CommonActions.reset({ routes: [{ name: 'MainStack' }] }),
    );
    /*  dispatch(
       loginAction({ userName: userName, pass: pass }),
     ); */
  };
  const onForgotPass = () => {
    navigate(AuthenticationRouter.FORGOTPASS, {})
  }

  return (
    <Layout bgColor={theme.type === 'light' ? colors.bgContent : colors.textColor}>
  
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1 }}>
      
        <View style={{alignItems:'center'}}>
          <Image source={images.Logo} style={{width:scale(300),height:scale(100),marginTop: blPage===A ? scale(200): scale(100)}}></Image>
          {blPage===A?<View>
          <Button style={{marginTop:scale(10),width:scale(150),height:scale(40),backgroundColor:colors.black,alignItems:'center',justifyContent: 'center',borderRadius:scale(5)}}
          onPress={() => setblPage(B)}
          ><Text style={{fontSize:scale(20),color:colors.white}}>Đăng nhập</Text></Button>
          <Button onPress={()=> setblPage(C)} style={{marginTop:scale(10),width:scale(150),height:scale(40),backgroundColor:colors.white,alignItems:'center',justifyContent: 'center',borderRadius:scale(5),borderWidth:1}}
          ><Text style={{fontSize:scale(20)}}>Đăng ký</Text></Button></View>:null}
        </View>

      {blPage===B?
      <View style={{ paddingHorizontal: scale(30), marginTop: scale(50) }}>
      <CInput
        placeholder='Địa chỉ Email'
        valueText={userName}
        onChangeText={(text: string) => { setUserName(text) }}
      />

       <View style={{marginTop:scale(15)}}>
        <CInput
          placeholder='Mật khẩu'
          valueText={pass}
          onChangeText={(text: string) => { setPass(text) }}
          secureTextEntry={!blSecurity}
        />
        {/* <Button onPress={() => setBlSecurity(!blSecurity)} style={styles.btnViewPass}>
          <Image source={!blSecurity ? images.eyeOff : images.eyeOn} style={styles.iconViewPass} />
        </Button> */}
      </View>
      <View style={styles.btnForgot}>
        <Button onPress={onForgotPass} >
          <Text semiBold style={styles.txtForgot}>Quên mật khẩu?</Text>
        </Button>
      </View> 

      <View style={{ flexDirection: "row", justifyContent: 'space-between', marginBottom: scale(20) }}>
        <Button onPress={() => goToHome()} style={[styles.btn]}>
          <Text bold style={styles.txtBtn}>Đăng nhập</Text>
        </Button> 
     
       
     </View>
     <View style={{flexDirection:'row', justifyContent: 'center',marginTop:scale(200)}}>
      <Text style={{textAlign:'center'}}>Bạn đã có tài khoản chưa? </Text>
      <Button onPress={()=>setblPage(C)}>
      <Text bold
      >Đăng ký</Text></Button>
     </View>
    </View> 
      :null}
    {blPage===C?
    <View style={{ paddingHorizontal: scale(30),marginTop:scale(20) }}>
      <CInput
        placeholder='Tên'
        valueText={userName}
        onChangeText={(text: string) => { setUserName(text) }}
      />
      <View style={{marginTop:scale(15)}}>
      <CInput
        placeholder='Họ'
        valueText={userName}
        onChangeText={(text: string) => { setUserName(text) }}
      /></View>
      <View style={{marginTop:scale(15)}}>
        <CInput
          placeholder='Mật khẩu'
          valueText={pass}
          onChangeText={(text: string) => { setPass(text) }}
          secureTextEntry={!blSecurity}
        /></View>
      <View style={{marginTop:scale(15)}}>
        <CInput
          placeholder='Nhập lại mật khẩu'
          valueText={pass}
          onChangeText={(text: string) => { setPass(text) }}
          secureTextEntry={!blSecurity}
        />
        {/* <Button onPress={() => setBlSecurity(!blSecurity)} style={styles.btnViewPass}>
          <Image source={!blSecurity ? images.eyeOff : images.eyeOn} style={styles.iconViewPass} />
        </Button> */}
      </View>
      <View style={styles.btnForgot}>
        <Button onPress={onForgotPass} >
          <Text semiBold style={styles.txtForgot}>Quên mật khẩu?</Text>
        </Button>
      </View> 
      <View style={{ flexDirection: "row", justifyContent: 'space-between', marginBottom: scale(20) }}>
        <Button onPress={() => goToHome()} style={[styles.btn]}>
          <Text bold style={styles.txtBtn}>Đăng ký</Text>
        </Button> 
     
       
     </View>
     <View style={{flexDirection:'row', justifyContent: 'center',marginTop:scale(100)}}>
      <Text style={{textAlign:'center'}}>Bạn đã có tài khoản? </Text>
      <Button onPress={()=>setblPage(B)}>
      <Text bold
      >Đăng Nhập</Text></Button>
     </View>
      
    </View>:null}
        
        
        
        
        
        
        
        
        
        
        
        
        
        {/* <View style={styles.slide}>
        <Image source={images.gmeet} style={{
          width: '100%',
          height: '93%',
          borderBottomLeftRadius: scale(48),
          borderBottomRightRadius: scale(48)
        }} />
        <View style={{
          position: 'absolute',
          alignItems: 'center',
          width: '100%',
          bottom: scale(15),
          justifyContent: 'center'
        }}> 
         <Image source={images.ggmeet  } style={styles.logo} />
           <View style={{ marginTop: scale(15) }}>
            <Text semiBold style={styles.textNormal}>Giải tỏa tinh thần</Text>
            <Text semiBold style={styles.textNormal}>Thỏa mãn yêu thích</Text>
          </View>
        </View>
      </View> */}
        {/* <View style={{ paddingHorizontal: scale(30), marginTop: scale(15) }}>
      
          <CInput
            placeholder='Nhập số điện thoại của bạn'
            valueText={userName}
            label='Số điện thoại'
            onChangeText={(text: string) => { setUserName(text) }}
          />
       
          <View style={{ flexDirection: "row", justifyContent: 'space-between', marginBottom: scale(20) }}>
            <Button onPress={() => goToHome()} style={[styles.btn]}>
              <Text bold style={styles.txtBtn}>Đăng nhập</Text>
            </Button> 
             <Button onPress={() => {
              doLoginWithBiometry();
            }} style={styles.btnFintger}>
              <IconFintger />
            </Button>
           
         </View>
           <View>
            <CInput
              placeholder='Nhập mật khẩu'
              valueText={pass}
              onChangeText={(text: string) => { setPass(text) }}
              secureTextEntry={!blSecurity}
            />
            <Button onPress={() => setBlSecurity(!blSecurity)} style={styles.btnViewPass}>
              <Image source={!blSecurity ? images.eyeOff : images.eyeOn} style={styles.iconViewPass} />
            </Button>
          </View>
          <View style={styles.btnForgot}>
            <Button onPress={onForgotPass} >
              <Text semiBold style={styles.txtForgot}>Quên mật khẩu?</Text>
            </Button>
          </View> 


        </View>  */}
      </KeyboardAwareScrollView>

      {isLoading && <Loading />}
    </Layout >
  );
};

const style = (theme: any) => StyleSheet.create({
  titleHeader: {
    fontSize: scale(18),
    color: colors.white,
  },
  logo: {
    width: scale(88),
    height: scale(100),
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
    color: theme.title,
    textAlign: 'center',
    fontSize: scale(16),

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
    backgroundColor: colors.black,
    marginTop: scale(30),
    borderRadius: scale(15),
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtBtn: {
    color: colors.white,
    fontSize: scale(18)
  },
  txtForgot: {
    fontSize: scale(14)
  },
  btnForgot: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: scale(10)
  },
  btnFintger: {
    borderWidth: scale(1),
    borderColor: colors.gray2x,
    borderRadius: scale(10),
    height: scale(48),
    width: scale(48),
    marginTop: scale(25),
    justifyContent: 'center',
    alignItems: 'center'
  },
  line: {
    width: '42%',
    height: scale(2),
    backgroundColor: colors.gray2x
  },
  txtOr: {
    color: colors.gray,
    fontSize: scale(16)
  },
  containerOr: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scale(25),
    marginBottom: scale(12)
  },
  containerOther: {

  },
  btnOther: {
    width: '100%',
    height: scale(48),
    borderColor: colors.gray,
    borderWidth: scale(1),
    marginTop: scale(10),
    borderRadius: scale(5),
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: scale(20)
  },
  txtBtnOther: {
    fontSize: scale(18)
  },
  iconOther: {
    width: scale(30),
    height: scale(30),
    resizeMode: 'contain',
    marginRight: scale(10)
  },
  txtRegister: {
    color: colors.mainColor,
    fontSize: scale(16)
  },
  containerRegister: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(30)
  },
  slide: {
    backgroundColor: colors.bgContainer,
    borderBottomLeftRadius: scale(48),
    borderBottomRightRadius: scale(48),
    height: 2 * device.h / 3,
    width: '100%',

  }
});

export default LoginScreen;


