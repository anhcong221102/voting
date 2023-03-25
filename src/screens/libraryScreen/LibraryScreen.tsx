import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import { Layout, Button, Text, Loading, Header, CInput, CCarousel } from 'components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { device, scale } from 'device';
import { colors, fonts, images } from 'assets';
import { useDispatch, useSelector } from 'react-redux';
import AuthenticationRouter from 'navigation/AuthenticationNavigation/AuthenticationRouter';
import { navigate } from 'navigation/RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  loginAction,
  onCloseModalAuthenticationMessage,
} from 'redux_manager/authentication/authenticationReducer';
import { ThemeContext } from 'assets/theme/ThemeContext';
import { RootState } from 'redux_manager/base/allReducers';
import Modal from 'react-native-modal';

import { useNavigation, CommonActions, StackActions } from '@react-navigation/native';
import { allActions } from 'redux_manager';
import { Config } from 'utils';
import { getErrors } from 'utils/config';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { ListNovel } from '../mainScreen/data/data';
import { Caarousel } from 'screens/mainScreen/components/Caarousel';
import CheckinStackRouter from 'navigation/ProfileStackNavigation/ProfileStackRouter';
import Theme from 'assets/theme/Theme';
const LibraryScreen = () => {
  const { isLoading, message, isError } = useSelector(
    (state: RootState) => state.authentication,
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [blSecurity, setBlSecurity] = useState(false);
  const [blView, setBlView] = useState(true);
  const { theme } = useContext(ThemeContext);
  const A = 'A';
  const B = 'B';
  const C = 'C';
  const [blPage, setblPage] = useState(A);

    const [text, setText] = useState<any>([
    {id:1, text:'cơ giáp'},
    {id:2, text:'edit'},
    {id:2, text:'edit'},
    {id:2, text:'edit'},
    {id:2, text:'edit'},
    {id:2, text:'edit'},
    {id:2, text:'edit'},

    ])
    useEffect(() => {
    
    }, []);

  const [data, setData] = useState<any>([
    { id: 0, title: 'Thoát xác lỡ ngã vào lòng anh', img: images.img1 },
    { id: 1, title: 'ChickLit', img: images.img1 },
    { id: 1, title: 'Cổ Điển', img: images.img1 },
    { id: 1, title: 'Cổ Điển', img: images.img1 },
    { id: 1, title: 'Cổ Điển', img: images.img1 },
    { id: 1, title: 'Cổ Điển', img: images.img1 },
  ])
  useEffect(() => {
    setData(data)
  }, [data.length]);




  const onForgotPass = () => {
    navigate(AuthenticationRouter.FORGOTPASS, {})
  }

  function changeTab(index: any, item: any): void {
    throw new Error('Function not implemented.');
  }
  const gotoDetail = (item: any) => {
    navigate(CheckinStackRouter.DETAILNOVEL, { item: item })
  }


  return (
    <Layout bgColor={colors.white} barStyle={'dark-content'}>

      <View style={{ flexDirection: 'row', }}>
        <Text style={{ marginLeft: scale(15), marginTop: scale(15), fontSize: scale(25),color: theme.title }}>Thư viện</Text>
        <Image source={images.question}
          style={{ width: scale(25), height: scale(25), margin: scale(20), marginLeft: scale(200),tintColor: theme.title }} />
        <Image source={images.dots}
          style={{ width: scale(25), height: scale(25), margin: scale(20), marginLeft: scale(5),tintColor: theme.title }} />
      </View>
      <View style={{ height: scale(50), backgroundColor: colors.gray2x, flexDirection: 'row', elevation: scale(2) }}>
        <Button style={styles.but}
          onPress={() => setblPage(A)}>
          <Text bold style={{ fontSize: scale(14) }}>TRUYỆN ĐANG ĐỌC</Text>
          {blPage === A ? <View style={{ position: 'absolute', bottom: 0, height: scale(4), width: scale(125), backgroundColor: colors.blue }}></View> : null}
        </Button>
        <Button style={styles.but}

          onPress={() => setblPage(B)}
        >
          <Text bold style={{ fontSize: scale(14) }}>LƯU TRỮ</Text>
          {blPage === B ? <View style={{ position: 'absolute', bottom: 0, height: scale(4), width: scale(125), backgroundColor: colors.blue }}></View> : null}

        </Button>

        <Button style={styles.but}
          onPress={() => setblPage(C)}
        >
          <Text bold style={{ fontSize: scale(14) }}>DANH SÁCH ĐỌC</Text>
          {blPage === C ? <View style={{ position: 'absolute', bottom: 0, height: scale(4), width: scale(125), backgroundColor: colors.blue }}></View> : null}

        </Button>
       
      </View>
      <ScrollView style={{ marginBottom: scale(20) }}>
      {blPage === A ?
        <View>
          <View style={{ flexDirection: 'row', }}>
            <Text bold style={{marginLeft: scale(15), marginTop: scale(15), fontSize: scale(18),color: theme.title}}>Có sẵn ngoại tuyến</Text>
            <Text style={{ marginLeft: scale(135), marginTop: scale(15), fontSize: scale(18), color: colors.gray }}>0 truyện</Text>
          </View>
          <View style={{ height: scale(115), borderWidth: 1, margin: scale(20), borderColor: colors.gray }}>

          </View>

          <View style={{ flexDirection: 'row', }}>
            <Text bold style={{marginLeft: scale(15), marginTop: scale(15), fontSize: scale(18),color: theme.title}}>Các truyện khác</Text>
            <Text style={{ marginLeft: scale(155), marginTop: scale(15), fontSize: scale(18), color: colors.gray }}>{data.length} truyện</Text>
          </View>

          
            <View style={{ margin: scale(15), flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              {data?.map((item: any, index: number) => {
                return (
                  <Button key={index} style={{ width: scale(100), height: scale(180), borderRadius: scale(10), marginTop: scale(10) }}
                  >
                    <Image source={item?.img}
                      style={styles.logo}></Image>
                    <View style={{ flexDirection: 'row', }}>
                      <View style={{
                        width: 75,
                        height: scale(2),
                        marginTop: scale(15),
                        backgroundColor: colors.gray
                      }}></View>
                      <Image source={images.cloud} style={{ width: scale(20), height: scale(20), margin: scale(5),tintColor:theme.title }}></Image>
                    </View>
                    <View>
                      <Text style={{ fontSize: 15,color:theme.title }}>{item?.title}</Text>
                    </View>
                  </Button>
                );
              })}

            </View>
          <View><Text bold style={{marginLeft: scale(15), marginTop: scale(15), fontSize: scale(18),color: theme.title}}>Tìm thêm nhiều truyện về</Text></View>
          <ScrollView horizontal
            style={{
              marginHorizontal: scale(20)
            }}
          >
          <View style={{
            flexDirection: 'row', margin: scale(10)
          }}>

              {text?.map((item: any, index: number) => {
                return (
                  <Button style={styles.butt}>
                  <Text semiBold style={{ fontSize: scale(17) }}>{item?.text}</Text></Button>
                );
              })}
          </View></ScrollView>
        </View>
        : null}
       {blPage === B ? 
  <View>
    <Image source={images.storage}
  style={{ width: scale(60), height: scale(60),alignSelf:'center',margin:scale(15),tintColor:theme.title}}/>
  <View><Text  style={{fontSize:scale(27),margin:scale(15),textAlign:'center',color:theme.title}} > Bạn không có truyện lưu trữ nào.
    </Text></View>
    
    <View style={{}}><Button 
    onPress={()=> setblPage(A)}
    style={{height:50,margin:scale(15),backgroundColor:colors.Orange,justifyContent: 'center',
    alignItems: 'center',}}>
      <Text semiBold style={{fontSize:scale(20),    

      color:colors.white}}>CHỌN TRUYỆN ĐỂ LƯU TRỮ</Text>
    </Button></View>
  </View>
  :null}
      {blPage === C ?

    //     <View style={{height:scale(200),backgroundColor:'grey',marginTop:scale(50),flexDirection: 'row',}}>
    //       <Button style={{ justifyContent: 'center',
    // alignItems: 'center',flexDirection: 'row',}}>
    //             <View style={{width: scale(120),borderWidth:1,height: scale(160),
    //             marginLeft:scale(20),}}>

    //               {/* <Image source={images.img1} style={{width: scale(100),borderWidth:1,height: scale(160),}}></Image> */}


    //            </View> 
    //            <View style={{flexDirection: 'row',}}><Text>asdasd</Text></View>
    <View style={{
      backgroundColor: colors.white,
      height: scale(200),

      flexDirection:'row',
      marginTop:scale(50)
    }}> 
              <Button style={{ justifyContent: 'center',
                flexDirection: 'row',marginTop:scale(17)}}>
               
                <Image source={images.img1} style={{width: scale(120),borderWidth:1,height: scale(160),
            marginLeft:scale(20),}}></Image>
                  <View style={{    paddingHorizontal: scale(10)}}>
                    <Text bold style={{    color: colors.textColor,
                    
                    fontSize: scale(16),
                    marginBottom: scale(10),}}>Danh sách đọc</Text>
                            <Text style={{color:colors.gray}} >0 Truyện</Text>        
                  </View>
                  <Image source={images.dots} style={{width:scale(20),height:scale(20), marginLeft:scale(90)}}></Image>
                  </Button>
                </View>
     
        // </View>
        : null}
</ScrollView>

      {isLoading && <Loading />}

    </Layout>
  );
};



const styles = StyleSheet.create({
  but: {
    width: scale(125),
    height: scale(50),
    justifyContent: 'center',
    alignItems: 'center'

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
  Text1: {
    marginLeft: scale(15), marginTop: scale(15), fontSize: scale(18)
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
    resizeMode: 'cover',
    width: scale(100),
    height: scale(120),
    borderRadius: scale(10)
    
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
  txtForgot: {
    fontSize: scale(14)
  }
});

export default LibraryScreen;
