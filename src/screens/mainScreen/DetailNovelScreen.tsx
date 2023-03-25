import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Layout from 'components/CLayout/Layout';
import { Button, CCarouselVer, Text } from 'components';
import { Alert, ScrollView, StyleSheet, View, FlatList, Animated, StatusBar, LayoutAnimation, Modal, TouchableWithoutFeedback } from 'react-native';
import { device, scale } from 'device';
import { colors, fonts, images } from 'assets';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux_manager/base/allReducers';
import { network } from 'services';
import { Config } from 'utils';
import { TextInputMask } from 'react-native-masked-text'
import moment from 'moment';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { allActions } from 'redux_manager';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CListView from 'components/CListView/CListView';

import config from 'utils/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemChap from './ItemChap';
import Toast from 'react-native-toast-message';
import { Image } from 'react-native-elements';
import { goBack } from 'navigation/RootNavigation';
import { ThemeContext } from 'assets/theme/ThemeContext';
import Theme from 'assets/theme/Theme';

interface Props {
  route: any;
}
function DetailNovelScreen({ route }: Props) {
  const [isLoading, setLoading] = useState(false);
  const { navigate } = useNavigation();
  const token = useSelector((state: RootState) => state.authentication.token);
  const profile = useSelector((state: RootState) => state.authentication.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState(route?.params?.item?.listChapter);
  const [name, setName] = useState('');
  const [stepTimeLine, setStepTimeLine] = useState<number>(1);
  const scrollViewRef = useRef<any>(null);
  const [blHeader, setblHeader] = useState(false);
  const [blShowChap, setBlShowChap] = useState(false);
  const { theme, onChangeTheme } = useContext(ThemeContext);
  const [sizeFonts, setSizeFont] = useState<number>(22);
  const [blSize, showSizeFonts] = useState(false);
  const styles = style(theme);
  useEffect(() => {

  }, []);



  const onNext = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current?.scrollTo({
        animated: true,
        x: stepTimeLine * device.w,
      });

    }
    console.log(data?.length)
    if (index == data?.length - 1) {
      Toast.show({
        text1: 'Thông báo',
        text2: 'Bạn đang ở cuối truyện',
      });
    }
  };
  const onPre = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: stepTimeLine ? (stepTimeLine - 2) * device.w : device.w,
        animated: true,
      })
    };

    if (index == 0) {
      Toast.show({
        text1: 'Thông báo',
        text2: 'Bạn đang ở đầu truyện',
      });
    }

  };

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 56);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 56],
    outputRange: [0, -56]
  });
  const handleOnScroll = (e: any) => {
    const offset = Math.round(e.nativeEvent.contentOffset.x / device.w) + 1;
    if (offset != stepTimeLine) {
      setStepTimeLine(offset);
    }
  };
  const setblHeadershow = () => {
    setblHeader(!blHeader);

  }


  const onToggleTheme = async () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onChangeTheme();
  };

  const onChangeFonts = async (index: number) => {
    const size = sizeFonts + index;
    if (size >= 30 && index == 1) {
      setSizeFont(30);
      return;
    }
    else if (size <= 14 && index == -1) {
      setSizeFont(14);
      return;
    }
    else {
      setSizeFont(size)
    }
  }
  const onChangeChap = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * device.w,
        animated: true,
      })
    };
    setStepTimeLine(index + 1);
    setBlShowChap(false)
  }
  return (
    <Layout bgColor={theme.type === 'light' ? colors.bgContent : colors.textColor}>
      {blHeader &&
        <Animated.View
          style={[{
            transform: [{ translateY: translateY }]
          }, styles.containerHeaderModal]}>
          <Button onPress={goBack} style={{ width: '10%' }} >
            <Image source={images.ic_back}
              style={styles.iconback} />

          </Button>
          <Button onPress={() => setBlShowChap(true)} style={styles.btnModalChap}>
            <Text style={styles.titleNormal} numberOfLines={2}>{data[stepTimeLine - 1].title}</Text>
            <Image source={images.ic_down}
              style={styles.icondown} />
          </Button>
          <View style={styles.headerRight}>
            <Button onPress={() => onToggleTheme()} style={styles.btnRightIcon}>
              <Image source={theme.type == 'light' ? images.sun : images.moon}
                style={styles.iconChangetheme} />
            </Button>
            <Button onPress={() => showSizeFonts(true)} style={styles.btnRightIcon}>
              <Text semiBold style={styles.title}>Aa</Text>
            </Button>
          </View>
        </Animated.View>}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        automaticallyAdjustContentInsets={false}
        scrollEnabled={true}
        snapToInterval={device.w}
        onScroll={(e) => handleOnScroll(e)}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}

      >
        {data?.map((item: any, index: number) => {
          return (
            <ScrollView showsVerticalScrollIndicator={false}
              key={index}
              style={{
                marginTop: blHeader == true ? scale(66) : 0,
                marginBottom: scale(60)
              }}
              onScroll={(e) => {
                scrollY.setValue(e.nativeEvent.contentOffset.y);
                setblHeader(false);
              }
              }
              scrollEventThrottle={16}
            >
              <Button onPress={() => setblHeadershow()}>
                <ItemChap index={index} data={item} theme={theme} sizeFonts={sizeFonts} />
              </Button>
            </ScrollView>
          );
        })}
      </ScrollView>
      <View style={styles.btn}>
        <Button onPress={() => { onPre(stepTimeLine) }} style={styles.btnContent}>
          <Text semiBold
            style={styles.txt}>Chương trước</Text>
        </Button>
        <Button onPress={() => { onNext(stepTimeLine) }} style={[styles.btnContent,{backgroundColor:colors.mainColor}]}>
          <Text semiBold style={[styles.txt, { color: colors.white }]}>Chương tiếp</Text>
        </Button>
      </View>
      <Modal animationType="slide"
        transparent={true}
        visible={blSize}

      >

        <TouchableWithoutFeedback
          onPress={() => showSizeFonts(false)}
        >
          <View style={styles.modal1}>
            <View
              style={styles.containerModal1}
            >
              <View style={styles.row}>
                <Text semiBold style={styles.txt}>Kích thước Phông chữ</Text>

              </View>
              <View
                style={styles.btnModal1}>
                <Button style={styles.btnmodal1}
                  onPress={() => onChangeFonts(-1)}>
                  <Text style={styles.txt}>Aa-</Text>
                </Button>
                <View style={styles.btnmodal1}
                >
                  <Text semiBold style={styles.txt}>{sizeFonts}</Text>
                </View>
                <Button style={styles.btnmodal1}
                  onPress={() => onChangeFonts(1)}>
                  <Text style={styles.txt}>Aa+</Text>
                </Button>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal animationType="slide"
        transparent={true}
        visible={blShowChap}
      >
        <TouchableWithoutFeedback
          onPress={() => setBlShowChap(false)}
        >
          <View style={styles.modal2}>
            <View
              style={styles.containerModal2}
            >
              <View style={styles.row}>
                <Text semiBold style={styles.titleModal2}>THOÁT XÁC LỠ NGÃ VÀO LÒNG ANH</Text>

              </View>
              <ScrollView style={styles.scrollModal2}
                showsVerticalScrollIndicator={false}
              >
                {data?.map((item: any, index: number) => {
                  return (
                    <Button key={index}
                      style={styles.btnModal2}
                      onPress={() => { onChangeChap(index) }}>
                      {stepTimeLine - 1 == index ? <Text
                        semiBold
                        style={styles.txtModal}>{item?.title}</Text> : <Text
                          style={styles.txt}>{item?.title}</Text>}
                    </Button>

                  );
                })}
              </ScrollView>
            </View>

          </View>
        </TouchableWithoutFeedback>


      </Modal>
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
  iconback: {
    width: scale(16),
    height: scale(16),
    resizeMode: 'contain',
    tintColor: theme.title,
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
  btn: {
    position: 'absolute',
    backgroundColor: colors.gray2x,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(25),
    width: '100%',
    bottom: 0
  },
  btnContent: {
    width: '50%',
    height: scale(48),
    justifyContent: 'center',
    alignItems: 'center'
  }

});
