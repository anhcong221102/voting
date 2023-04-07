import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Layout from 'components/CLayout/Layout';
import { Button, CButton, Col, Header, Row, Text } from 'components';
import { Alert, ScrollView, StyleSheet, View, Image, LayoutAnimation, StatusBar, Linking } from 'react-native';
import { device, scale } from 'device';
import { colors, fonts } from 'assets';
import Theme from 'assets/theme/Theme';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux_manager/base/allReducers';
import { network } from 'services';
import { Config } from 'utils';
import moment from 'moment';
import CListView from "components/CListView/CListView";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { allActions } from 'redux_manager';
import { goBack, navigate } from 'navigation/RootNavigation';
import AuthenticationRouter from 'navigation/AuthenticationNavigation/AuthenticationRouter';
import { ListNovel } from './data/data';
import NovelItem from './components/NovelItem';
import { Caarousel } from './components/Caarousel';

import { ThemeContext } from 'assets/theme/ThemeContext';
import MainStackRouter from 'navigation/MainStackNavigation/MainStackRouter';
import { images } from '../../assets';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { JumpingTransition } from 'react-native-reanimated';
import { createStackNavigator } from '@react-navigation/stack';
import DetailNovelScreen from './DetailNovelScreen';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import styles from 'css/styles';
function HomeScreen() {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [date, setDate] = useState<Date>(new Date());
  const [data, setData] = useState([]);
  const isRefresh = useRef<boolean>(false);
  const { theme } = useContext(ThemeContext);

  const [blBut, setblBut] = useState(false);

  const TikTok = async () => {

    Linking.openURL('https://www.tiktok.com/@payxabengg');

  };
  const [current, setCurrent] = useState(-1);

  const A = 'A';
  const B = 'B';
  const C = 'C';
  const D = 'D';
  const E = 'E';
  const [blPage, setblPage] = useState(A);
  const [QR, setQR] = useState(false);

  const styles = style(theme);

  const [hop, setHop] = useState<any>([
    { id: 0, title: 'Cuộc họp 1', text: 'Đã thanh toán', time: '10am, 30may' },
    { id: 1, title: 'Cuộc họp 2', text: 'Chưa thanh toán', time: '10am, 30may' },
    { id: 1, title: 'Cuộc họp 3', text: 'Chưa thanh toán', time: '10am, 30may' },
    { id: 0, title: 'Cuộc họp 4', text: 'Đã thanh toán', time: '10am, 30may' },
  ])

  useEffect(() => {

  }, []);

  const Stack = createStackNavigator();
  const [showButton, setShowButton] = useState(false);


  const gotoDetail = (item: any) => {
    navigate(MainStackRouter.DETAILNOVEL, { item: item })
  }


  return (
    <Layout>
      <View style={{
        marginTop: scale(15),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: colors.line,
        borderBottomWidth: scale(1),
        paddingBottom: scale(15),
        backgroundColor: colors.white
      }}>

        <Image source={images.Logo} style={{
          width: scale(130),
          height: scale(40)
        }}></Image>

        <View style={{
          flexDirection: 'row',
          marginRight: scale(10)
        }}>
          <Text style={{ marginRight: scale(10) }}>Nguyễn Văn A</Text>
          <Image source={images.img1} style={styles.ImgUser}></Image></View>
      </View>

      {/* {!QR &&
         <KeyboardAwareScrollView
         bounces={false}
         showsVerticalScrollIndicator={false}
         contentContainerStyle={{ flex: 1 }}> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        {hop?.map((item: any, index: number) => {
          return (
            <Button key={index} onPress={() => setblBut(!blBut)}>
              <View style={{ height: scale(80), borderWidth: 1, borderColor: colors.gray2x, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: blBut ? 0.9 : 1 }}>
                  <View style={{ margin: scale(15), flex: 1 }}>
                    <Text semiBold style={{ fontSize: scale(20) }}>{item?.title}</Text>
                    <Text style={{
                      fontSize: scale(15),
                      marginTop: scale(3),
                      color: colors.gray
                    }}>{item?.time}</Text>
                  </View>
                  <Text style={{
                    marginRight: scale(20),
                    fontSize: scale(15),
                    textAlign: 'right',
                    color: item.id === 1 ? 'red' : colors.blue,
                  }}>{item?.text}</Text>
                </View>
                {/* {showButton &&(
                        <View>
                          <Button  onPress={(gotoDetail)}style={{width:scale(30),height:'50%',borderWidth:1}} 
                          ><Text>asdv</Text></Button> 
                          <Button  onPress={()=> setShowButton(false)}style={{width:scale(30),height:'50%',borderWidth:1}}
                          ><Text>asdas</Text></Button> 
                        </View>
                      )} */}
                {blBut &&
                  <View style={{ flex: 0.1, backgroundColor: colors.red }}>
                    <Button style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: colors.textColor,
                      width: '100%',
                      flex: 1
                    }}
                      onPress={gotoDetail}>

                      <Image source={images.dots}
                        style={{
                          width: scale(20),
                          height: scale(20),
                          tintColor: colors.white
                        }}></Image></Button>
                    <Button style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: colors.mainColor,
                      width: '100%',
                      flex: 1
                    }}
                    ><Image source={images.trash}
                      style={{
                        width: scale(20),
                        height: scale(20),
                        tintColor: colors.white
                      }}></Image></Button>
                  </View>}
              </View></Button>
          );
        })}
      </ScrollView>
      {/* <Button style={{with:scale(100),height:scale(25),borderRadius:scale(3),marginLeft:scale(5),backgroundColor:colors.green}}
            onPress={TikTok}><Text>Online</Text></Button>
            <Button style={{with:scale(100),height:scale(25),borderRadius:scale(3),marginLeft:scale(5),backgroundColor:colors.green}}
            onPress={()=> setQR(true)}><Text>Offline</Text></Button> */}
      {/* </KeyboardAwareScrollView>
      }
          {QR &&
            <View style={{alignItems:'center',margin:scale(15)}}>
            <Image source={images.QR} style={{width:scale(300),height:scale(300)}}></Image>
          <Button style={{width:scale(220),height:scale(50),backgroundColor:colors.blue,borderRadius:scale(10),alignItems:'center',justifyContent: 'center',}}
          onPress={()=>setQR(false)}>
            <Text semiBold style={{fontSize:scale(20),color:colors.white}}>Quay về Danh sách</Text></Button>
          </View>} */}
    </Layout >
  );
};

export default HomeScreen;

const style = (theme: any) => StyleSheet.create({
  ImgUser: {
    height: scale(30),
    width: scale(30),
    borderRadius: scale(25),

  },
  but: {
    width: scale(75),
    height: scale(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.red
  },
  btnRightIcon: {
    width: scale(30),
    height: scale(30),
    justifyContent: 'center',
    alignItems: 'center'
  },
  icstore: {
    width: scale(30),
    height: scale(30),
    resizeMode: 'contain',
  },
  iconChangetheme: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
  },
  title: {
    fontSize: scale(20),
    textTransform: 'capitalize',
    color: theme.title,

  },
  noDataContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50%',
  },
  txtNoData: {
    fontSize: scale(18),
  },
  containerTitle: {
    // backgroundColor: colors.mainColor,
    paddingVertical: scale(15),
    paddingHorizontal: scale(16)
  },
  containerText: {
    paddingHorizontal: scale(10)
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
