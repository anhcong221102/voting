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
import { Caarousel } from '../mainScreen/components/Caarousel';
import { RootState } from 'redux_manager/base/allReducers';
import Modal from 'react-native-modal';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { allActions } from 'redux_manager';
import { Config } from 'utils';
import { getErrors } from 'utils/config';
import { ThemeContext } from 'assets/theme/ThemeContext';
import { colorsDark } from 'react-native-elements/dist/config';
import { ListNovel } from '../mainScreen/data/data';
import MainStackRouter from 'navigation/MainStackNavigation/MainStackRouter';
import DatePicker from 'react-native-datepicker';
import ImageCropPicker from 'react-native-image-crop-picker';

import { ScreenContainer } from 'react-native-screens';
const CreatedScreen = () => {
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
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };

  const onForgotPass = () => {
    navigate(AuthenticationRouter.FORGOTPASS, {})
  }

  function changeTab(index: any, item: any): void {
    throw new Error('Function not implemented.');
  }
  const handleBlur = () => {
    setBlViewSearch(true);
  };
  const gotoDetail = (item: any) => {
    navigate(MainStackRouter.DETAILNOVEL, { item: item })
  }
  const [text, setText] = useState(false);
  const [checkbox, setCheckbox] = useState(false);




  return (
    <Layout bgColor={colors.white} barStyle={'dark-content'}>


      <ScrollView
        showsVerticalScrollIndicator={false}>
        <View style={{ width: '100%', alignItems: 'center', paddingTop: scale(20) }}>
          <Button style={{ width: scale(80), height: scale(80), borderColor: colors.gray, borderWidth: 1, borderRadius: scale(50), alignItems: 'center', justifyContent: 'center' }}
          ><Image source={images.upload} style={{ width: scale(70), height: scale(70) }}></Image></Button>
        </View>

        <View style={{ margin: scale(10) }}><Text style={styles.textTitle}>Tên đại hội:</Text>
          <CInput
            placeholder='Tên đại hội'
            valueText={userName}
            onChangeText={(text: string) => { setUserName(text) }}
          />
        </View>
        <View style={{ margin: scale(10) }}><Text style={styles.textTitle}>Tên tiêu đề:</Text>
          <CInput
            placeholder='Tên tiêu đề'
            valueText={userName}
            onChangeText={(text: string) => { setUserName(text) }}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ margin: scale(10) }}><Text style={styles.textTitle}>Danh sách cổ đông:</Text>
            <Button style={{ width: scale(80), height: scale(80), borderWidth: 1, borderColor: colors.gray, borderRadius: scale(10), alignItems: 'center', justifyContent: 'center' }}
            ><Image source={images.uploadfile} style={{ width: scale(70), height: scale(70) }}></Image></Button>
          </View>
          <View style={{ margin: scale(10) }}><Text style={styles.textTitle}>Mẫu thư mời:</Text>
            <Button style={{ width: scale(80), height: scale(80), borderWidth: 1, borderColor: colors.gray, borderRadius: scale(10), alignItems: 'center', justifyContent: 'center' }}
            ><Image source={images.uploadfile} style={{ width: scale(70), height: scale(70) }}></Image></Button>
          </View>
        </View>
        <View><Text style={styles.textTitle}>Hình thức cuộc họp</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row' }}>
              <Button style={styles.btnViewPass}
                onPress={() => setCheckbox(!checkbox)}>{checkbox && <Image source={images.checkbox} style={{ width: scale(21), height: scale(21) }} />}</Button>

              <Text style={{ marginTop: scale(20) }}>Online</Text></View>
            <View style={{ flexDirection: 'row' }}>
              <Button style={styles.btnViewPass}
                onPress={() => setCheckbox(!checkbox)}>{checkbox && <Image source={images.checkbox} style={{ width: scale(21), height: scale(21) }} />}</Button>

              <Text style={{ marginTop: scale(20) }}>Offline</Text></View>

          </View>

        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ margin: scale(10) }}><Text style={styles.textTitle}>Quy mô đại hội:</Text>
            <View style={{
              width: scale(160), height: text ? scale(100) : scale(50),
              borderWidth: 1, borderRadius: scale(5),
              borderColor: colors.gray, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center',
            }}>
              <Text style={{ margin: scale(10) }}>10-50</Text>

              <Button
                onPress={() => setText(!text)}><Image source={images.ic_down} style={{
                  width: scale(16),
                  height: scale(16), margin: scale(10),
                  resizeMode: 'contain',
                  tintColor: theme.title,
                }}></Image></Button>
            </View>
          </View>
          <View style={{ margin: scale(10) }}><Text style={styles.textTitle}>Số ghế Offline:</Text>
            <View style={{
              width: scale(160), height: text ? scale(100) : scale(50),
              borderWidth: 1, borderRadius: scale(5),
              borderColor: colors.gray, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center',
            }}>
              <Text style={{ margin: scale(10) }}>10-50</Text>

              <Button
                onPress={() => setText(!text)}><Image source={images.ic_down} style={{
                  width: scale(16),
                  height: scale(16), margin: scale(10),
                  resizeMode: 'contain',
                  tintColor: theme.title,
                }}></Image></Button>
            </View>
          </View></View>
        <View style={{ margin: scale(10) }}><Text style={styles.textTitle}>Danh sách câu hỏi:</Text>
          <Button style={{ width: scale(80), height: scale(80), borderWidth: 1, borderColor: colors.gray, borderRadius: scale(10), alignItems: 'center', justifyContent: 'center' }}
          ><Image source={images.uploadfile} style={{ width: scale(70), height: scale(70) }}></Image></Button>
        </View>
        {/* <View style={{margin:scale(10)}}>
      <DropDownPicker
        items={[
          {label: 'Item 1', value: 'item1'},
          {label: 'Item 2', value: 'item2'},
          {label: 'Item 3', value: 'item3'},
        ]}
        defaultValue={selectedValue}

        style={{backgroundColor: '#fafafa'}}
        itemStyle={{
          justifyContent: 'flex-start'
        }}
        dropDownStyle={{backgroundColor: '#fafafa'}}
        onChangeItem={item => setSelectedValue(item.value)}
      />
    </View> */}
        {/* <DropDownPicker
     items={[        
      {label: 'Apple', value: 'apple'},        
      {label: 'Banana', value: 'banana'},        
      {label: 'Orange', value: 'orange'},    ]}
    defaultValue={selectedValue}
    containerStyle={{height: 40}}
    onChangeItem={item => setSelectedValue(item.value)}
/> */}
        <View style={{ padding: scale(10) }}>
          <Text style={{ fontSize: scale(17) }}>Thời gian diễn ra:</Text>
          <DatePicker
            date={date}
          />
        </View>
      </ScrollView>
      {isLoading && <Loading />}

    </Layout>
  );
};

const styles = StyleSheet.create({
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
  ImgUser: {
    height: scale(30),
    width: scale(30),
    borderRadius: scale(25),

  },
  Brow: {
    width: '70%', height: scale(50),
    borderWidth: 1, borderRadius: scale(5),
    borderColor: colors.gray, justifyContent: 'center'
  },
  butt: {
    width: scale(70),
    height: scale(40),
    borderRadius: scale(5),
    backgroundColor: colors.nen,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: scale(15)
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
    width: scale(20),
    height: scale(20),
    borderWidth: 1,
    marginTop: scale(20),
    marginLeft: scale(15),
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center'
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
    fontSize: scale(20), margin: scale(10),
  },
  textNormal: {
    fontSize: scale(12),
    color: colors.textColor,
    marginTop: scale(2)
  }
});

export default CreatedScreen;
