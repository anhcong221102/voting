import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Layout from 'components/CLayout/Layout';
import { Button, CButton, Col, Header, Row, Text } from 'components';
import { Alert, ScrollView, StyleSheet, View, Image, LayoutAnimation, StatusBar } from 'react-native';
import { device, scale } from 'device';
import { colors, fonts } from 'assets';

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
function HomeScreen() {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [date, setDate] = useState<Date>(new Date());
  const [data, setData] = useState([]);
  const isRefresh = useRef<boolean>(false);
  const { theme } = useContext(ThemeContext);

  const styles = style(theme);
  useEffect(() => {

  }, []);
  useEffect(() => {
    if (isRefresh.current) {
      isRefresh.current = false;

    }
  }, [data]);

  const gotoDetail = (item: any) => {
    navigate(MainStackRouter.ABOUTMORE, { item: item })
  }
  const _renderEmpty = () => {
    return <View style={styles.noDataContainer}>
      <Text style={styles.txtNoData}>No Data</Text>
    </View>
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
        backgroundColor: colors.white}}>
          <Button style={styles.btnRightIcon}>
                <Image source={images.ic_back}
                    style={styles.iconChangetheme} />
            </Button>
            <Text bold style={styles.title}>Danh sách</Text>
           
           <Button style={styles.btnRightIcon}>
                <Image source={images.store}
                    style={styles.icstore} />
            </Button>
        </View>
      
      <ScrollView style={{ marginBottom: scale(20) }}>
        <View style={styles.containerTitle}>
          <Text bold style={styles.title}>Truyện đã hoàn thành</Text>
          <Text style={{ color: colors.mainColor }}>Đọc say sưa không lo ngắt quãng</Text>
        </View>
        <Caarousel data={ListNovel} gotoDetail={gotoDetail} />

        <View>
          <View style={styles.containerTitle}>
            <Text bold style={styles.title}>Truyện hay nhất đề xuất cho Bạn</Text>
            <Text style={{ color: colors.mainColor }}>Được quan tâm và đọc nhiều nhất</Text>
          </View>
          <ScrollView horizontal
            style={{
              marginHorizontal: scale(20)
            }}
          >
            {ListNovel?.map((item: any, index: number) => {
              return (
                <Button
                  style={{
                    marginTop: scale(30),

                  }}
                >
                  <Image source={item.avatar}
                    style={{
                      width: scale(110),
                      height: scale(160),
                      position: 'absolute',
                      zIndex: 10000,
                      top: scale(-20),
                      borderRadius: scale(5),
                    }} />
                  <View style={{
                    backgroundColor: colors.bgContent,
                    height: scale(160),
                    width: device.w - scale(80),
                    marginRight: scale(10),
                    borderRadius: scale(5),
                    paddingLeft: scale(110),
                    paddingTop: scale(8)
                  }}>
                    <View style={styles.containerText}>
                      <Text bold numberOfLines={1} style={styles.textNormal}>{item?.title}</Text>
                      <Text style={styles.textNormal}>Tác giả: <Text semiBold style={styles.textNormal}>{item?.author}</Text></Text>
                      <Text numberOfLines={1} style={styles.textNormal}>Thể loại: <Text semiBold style={styles.textNormal}>{item?.type}</Text></Text>
                      <View style={{
                        flexDirection: 'row',
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        paddingRight: scale(5)
                      }}>
                        <Text semiBold numberOfLines={1} >{item?.numberChapter} chương</Text>
                        <View style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingHorizontal: scale(8),
                          backgroundColor: colors.mainColor,
                          borderRadius: scale(20),
                          paddingVertical: scale(2),
                          marginVertical: scale(5)
                        }}>
                          <Text semiBold numberOfLines={1} style={{ fontSize: scale(11), color: colors.white }}>Hoàn thành</Text>
                        </View>
                      </View>
                      <Text numberOfLines={2} style={styles.textNormal}>{item?.introduce}</Text>
                    </View>

                  </View>
                </Button>
              );
            })}
          </ScrollView>
        </View>
        <View>
          <View style={styles.containerTitle}>
            <Text bold style={styles.title}>Truyện mới cập nhật</Text>
            <Text style={{ color: colors.mainColor }}>Tham khảo các mẫu truyện hay hơn</Text>
          </View>
          {ListNovel?.map((item: any, index: number) => {
            return (
              <Button
                style={{
                  marginTop: scale(30),
                  marginHorizontal: scale(20)
                }}
              >
                <Image source={item.avatar}
                  style={{
                    width: scale(110),
                    height: scale(160),
                    position: 'absolute',
                    zIndex: 10000,
                    top: scale(-20),
                    borderRadius: scale(5),
                  }} />
                <View style={{
                  backgroundColor: colors.bgContent,
                  height: scale(160),
                  width: device.w - scale(40),
                  marginRight: scale(10),
                  borderRadius: scale(5),
                  paddingLeft: scale(110),
                  paddingTop: scale(8)
                }}>
                  <View style={styles.containerText}>
                    <Text bold numberOfLines={1} style={styles.textNormal}>{item?.title}</Text>
                    <Text style={styles.textNormal}>Tác giả: <Text semiBold style={styles.textNormal}>{item?.author}</Text></Text>
                    <Text numberOfLines={1} style={styles.textNormal}>Thể loại: <Text semiBold style={styles.textNormal}>{item?.type}</Text></Text>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingRight: scale(5)
                    }}>
                      <Text semiBold numberOfLines={1} >{item?.numberChapter} chương</Text>
                      <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: scale(8),
                        backgroundColor: colors.mainColor,
                        borderRadius: scale(20),
                        paddingVertical: scale(2),
                        marginVertical: scale(5)
                      }}>
                        <Text semiBold numberOfLines={1} style={{ fontSize: scale(11), color: colors.white }}>Hoàn thành</Text>
                      </View>
                    </View>
                    <Text numberOfLines={2} style={styles.textNormal}>{item?.introduce}</Text>
                  </View>

                </View>
              </Button>
            );
          })}
        </View>
      </ScrollView>

    </Layout >
  );
}

export default HomeScreen;

const style = (theme: any) => StyleSheet.create({
  btn: {
    height: scale(48),
    backgroundColor: colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(8),
    marginHorizontal: scale(20),
    marginVertical: scale(20)
  },
  btnRightIcon:{
    width: scale(30),
    height: scale(30),
    justifyContent: 'center',
    alignItems: 'center'
  },
  icstore:{width: scale(30),
    height: scale(30),
    resizeMode: 'contain',},
  iconChangetheme:{
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
