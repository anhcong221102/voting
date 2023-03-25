/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
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
import { ThemeContext } from 'assets/theme/ThemeContext';
import { colorsDark } from 'react-native-elements/dist/config';

const SearchScreen = () => {
  const { isLoading, message, isError } = useSelector(
    (state: RootState) => state.authentication,
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [blSecurity, setBlSecurity] = useState(false);
  const isRefresh = useRef<boolean>(false);
  const [blViewSearch, setBlViewSearch] = useState(false);
  const [data, setData] = useState<any>([
    { id: 0, title: 'Bí ẩn', img: images.mystery },
    { id: 1, title: 'ChickLit', img: images.chicklit },
    { id: 1, title: 'Cổ Điển', img: images.newadult },
    { id: 1, title: 'Fanfiction', img: images.fanfic },
    { id: 1, title: 'Hài hước', img: images.humor },
    { id: 1, title: 'Hành động', img: images.action },
    { id: 1, title: 'Khoa học', img: images.scifi },
    { id: 1, title: 'Kinh dị', img: images.horror },
    { id: 1, title: 'Lãng mạn', img: images.romance },
    { id: 1, title: 'Ma cà rồng', img: images.vampire },
  ])
  useEffect(() => {

  }, []);

  const { theme } = useContext(ThemeContext);



  const onForgotPass = () => {
    navigate(AuthenticationRouter.FORGOTPASS, {})
  }

  function changeTab(index: any, item: any): void {
    throw new Error('Function not implemented.');
  }
  const handleBlur = () => {
    setBlViewSearch(true);
  };


  return (
    <Layout bgColor={colors.white} barStyle={'dark-content'}>

      <View style={{ width: '100%' }}>

        <Text bold style={{ marginLeft: scale(15), marginTop: scale(15), fontSize: scale(25), color: theme.title }}>Tìm Kiếm</Text>

        <View style={{
          height: scale(40),
          borderWidth: scale(1),
          margin: scale(15),
          borderRadius: scale(20),
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: '#CCCCCC',
          justifyContent: 'space-between',
          marginRight: blViewSearch ? scale(60) : scale(15),
          backgroundColor:colors.white
        }}>
          <Image source={images.search}
            style={{ width: scale(20), height: scale(20), marginLeft: scale(15) }} />

          <CInput
            placeholder='Tìm kiếm truyện'
            valueText={userName}
            containerStyle={{ borderWidth: 0, height: scale(35), marginRight: scale(6), borderRadius: scale(20) }}
            onChangeText={(text: string) => { setUserName(text) }}
            style={{
              width: '90%'
            }}
            onFocus={() => setBlViewSearch(true)}
            onBlur={() => setBlViewSearch(false)}
          />
          <Button onPress={() => setBlViewSearch(false)}
          >
            <Text bold style={{ marginLeft: scale(15), fontSize: scale(18),color: theme.title }}>Hủy</Text></Button>
        </View>
      </View>

      <View style={{
        flexDirection: 'row', marginLeft: scale(10), display: blViewSearch ? 'flex' : 'none'
      }}>
        <Button style={styles.butt}>
          <Text style={{ fontSize: scale(17) }}>Tiêu đề</Text></Button>
        <Button style={styles.butt}>
          <Text style={{ fontSize: scale(17) }}>Tag</Text></Button>
        <Button style={styles.butt}>
          <Text style={{ fontSize: scale(17) }}>Hồ sơ</Text></Button>
      </View>
      <View style={styles.line}></View>
      {!blViewSearch &&
        <KeyboardAwareScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}>


          <View>
            <Text bold style={{ marginTop: scale(20), marginLeft: scale(15), fontSize: scale(25),color: theme.title }}>Khám phá các tag</Text>
            <ScrollView style={{ marginTop: scale(10) }}
              showsVerticalScrollIndicator={false}
            >
              <View style={{ margin: scale(10), flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>

                {data?.map((item: any, index: number) => {
                  return (
                    <Button key={index}
                      style={{
                        height: scale(70),
                        width: '48%',
                        borderBottomColor: colors.mainColor,
                        backgroundColor: colors.bgContent,
                        borderRadius: 10,
                        flexDirection: 'row',
                        marginTop: scale(10),
                        alignItems: 'center',
                        elevation: scale(5)
                      }}>
                      <Text bold style={{
                        fontSize: scale(16), width: '60%', alignItems: 'flex-start',
                        justifyContent: 'center', paddingLeft: 8,
                      }}>{item?.title}</Text>
                      <View style={{}}>
                        <Image
                          source={item?.img}
                          style={styles.logo} />

                      </View>

                    </Button>

                  );
                })}



              </View>


            </ScrollView>
          </View>
        </KeyboardAwareScrollView>

      }



      {isLoading && <Loading />}

    </Layout>
  );
};

const styles =   StyleSheet.create({
  but: {
    height: scale(70),
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '49%',
    borderBottomColor: colors.mainColor,
    backgroundColor: 'red',
    paddingHorizontal: scale(8),
    borderRadius: scale(10),
    marginBottom: scale(5)
  },
  butt: {
    width: scale(70),
    height: scale(30),
    borderColor: colors.gray2x,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(20),
    margin: scale(3),
    backgroundColor: colors.gray2x,
  },
  line: {
    width: '100%',
    height: scale(2),
    marginTop: scale(10),
    backgroundColor: colors.gray2x
  },
  titleHeader: {
    fontSize: scale(18),
    color: colors.white,
  },
  logo: {
    width: scale(70),
    height: scale(70),
    resizeMode: 'cover',
    borderRadius: scale(10)
  },
  container: {
    flex: 1,
    borderTopLeftRadius: scale(22),
    borderTopRightRadius: scale(22),
    paddingHorizontal: scale(20),
    justifyContent: 'flex-start',
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
  txtForgot: {
    fontSize: scale(14)
  },
  textTitle: {
    flexWrap: 'wrap',
    width: '75%',
    fontSize: scale(17),
    textTransform: 'uppercase',
    color: colors.textColor,
  },
  textNormal: {
    fontSize: scale(12),
    color: colors.textColor,
    marginTop: scale(2)
  }
});

export default SearchScreen;
