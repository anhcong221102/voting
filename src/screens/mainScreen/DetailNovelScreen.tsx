import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Platform, ImageBackground, ScrollView } from 'react-native';
import { Layout, Button, Text, Loading, Header, CInput } from 'components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { device, scale } from 'device';
import { colors, fonts, IconFintger, images } from 'assets';
import { useDispatch, useSelector } from 'react-redux';
import AuthenticationRouter from 'navigation/AuthenticationNavigation/AuthenticationRouter';
import { goBack, navigate } from 'navigation/RootNavigation';
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
import { CheckBox, Image } from 'react-native-elements';
import MainStackRouter from 'navigation/MainStackNavigation/MainStackRouter';
import { ThemeContext } from "assets/theme/ThemeContext";
import DropDownPicker from 'react-native-dropdown-picker';

interface Props {
  route: any;
}
function DetailNovelScreen({ route }: Props) {
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
  const onForgotPass = () => {
    navigate(AuthenticationRouter.FORGOTPASS, {})
  }
  const A = 'A';
  const B = 'B';
  const C = 'C';
  const [blPage, setblPage] = useState(A);


  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckBox = () => {
    setIsChecked(!isChecked);
  };



  const doLoginWithBiometry = (res?: string | boolean) => {
    try {
      TouchID.authenticate(
        `Sử dụng Vân tay/Khuôn mặt để mở khoá ứng dụng`
        ,
        {
          
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
  
 
  return (
    <Layout bgColor={theme.type === 'light' ? colors.bgContent : colors.textColor}>
       <View style={{
        marginTop: scale(15),
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottomColor: colors.line,
        borderBottomWidth: scale(1),
        paddingBottom: scale(15),
        backgroundColor: colors.white,
        margin:scale(5)
      }}>
        <Button onPress={goBack} style={{ width: '10%' }}><Image source={images.ic_back} style={{    width: scale(16),
    height: scale(16),
    resizeMode: 'contain',
    tintColor: theme.title,}}/></Button>
        <Image source={images.Logo} style={{ width: scale(130), height: scale(40) }}></Image>

        <View style={{ flexDirection: 'row', marginRight: scale(10) }}><Text style={{ marginRight: scale(10) }}>Nguyễn Văn A</Text>
          <Image source={images.img1} style={styles.ImgUser}></Image></View>
      </View>
   
      <View style={{ paddingHorizontal: scale(30), marginTop: scale(50) }}>
      <CInput
        placeholder='Tên cuộc họp'
        valueText={userName}
        onChangeText={(text: string) => { setUserName(text) }}
      />

       <View style={{marginTop:scale(15)}}>
       <CInput
        placeholder='Tên cuộc họp'
        valueText={userName}
        onChangeText={(text: string) => { setUserName(text) }}
      />
      </View>
      <View style={{flexDirection:'row',marginTop:scale(20)}}>
      
      <Text style={{fontSize:scale(20)}}>{isChecked ? 'Thanh toán' : 'chưa thanh toán'}</Text>
      <CheckBox onPress={()=> setIsChecked(true)}/>
    </View>
      <View style={{margin:scale(50),marginTop:scale(200)  }}>
            <Button onPress={() => goToHome()} style={styles.btn}>
              <Text bold style={styles.txtBtn}>Đăng nhập</Text>
            </Button> 
         </View>
     </View>
    
 
    </Layout>
  );
}

export default DetailNovelScreen;

const style = (theme: any) => StyleSheet.create({
  containerHeaderModal: {
    backgroundColor: theme.header.backgroundColor,
    height: scale(56),
    position: 'absolute',
    zIndex: 100000,
    width: '100%',
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: scale(20),
    paddingLeft: scale(15),
    justifyContent: 'space-between'
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
  ImgUser: {
    height: scale(30),
    width: scale(30),
    borderRadius: scale(25),

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  txtBtn: {
    color: colors.white,
    fontSize: scale(18)
  },
  btn: {
    height:scale(40),
    width:scale(200),
    justifyContent: 'center',
    backgroundColor:colors.black,
    borderRadius:scale(5),
    alignItems: 'center',
  },
  txtForgot: {
    fontSize: scale(14)
  },
  btnForgot: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: scale(10)
  },

  icondown: {
    width: scale(10),
    height: scale(10),
    resizeMode: 'contain',
    tintColor: theme.title,
    marginLeft: scale(5)
  },
  btnRightIcon: {
    width: scale(30),
    height: scale(30),
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconChangetheme: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',

  },
  title: {
    fontSize: scale(20),
    color: theme.title
  },
  titleNormal: {
    fontSize: scale(16),
    color: theme.title
  },
  btnModalChap: {
    width: '65%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  txtModal: {
    fontSize: scale(18),
    lineHeight: scale(20),
    color: colors.mainColor
  },
  txt: {
    fontSize: scale(18),
    lineHeight: scale(20),

  },
  containerModal2: {
    backgroundColor: colors.white,
    height: device.h - scale(130),
    width: '100%',
    borderTopRightRadius: scale(20),
    borderTopLeftRadius: scale(20),
    paddingVertical: scale(20),
    paddingHorizontal: scale(10)
  },
  modal2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: theme.type == 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
  },
  btnModal2: {
    paddingVertical: scale(10),
    borderBottomColor: colors.gray2x,
    borderBottomWidth: scale(1)

  },
  titleModal2: {
    fontSize: scale(18),
    width: '80%',
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  scrollModal2: {
    paddingHorizontal: scale(20),
    marginTop: scale(10)
  },
  modal1: {
    flex: 1,
    alignItems: 'center',
    marginTop: scale(55)
  },
  containerModal1: {
    backgroundColor: colors.white,
    height: scale(120),
    width: '100%',
    borderBottomRightRadius: scale(20),
    borderBottomLeftRadius: scale(20),
    paddingVertical: scale(15),
    paddingHorizontal: scale(30),
    borderColor: colors.mainColor,
    borderTopWidth: scale(1),
    borderBottomWidth: scale(1)
  },
  btnModal1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(20)
  },
  btnmodal1: {
    height: scale(35),
    width: scale(80),
    borderColor: colors.textColor,
    borderWidth: scale(1),
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerRight: {
    width: '21%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  btnContent: {
    width: '50%',
    height: scale(48),
    justifyContent: 'center',
    alignItems: 'center'
  }

});
