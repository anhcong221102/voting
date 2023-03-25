import React, { useContext, useEffect, useState } from 'react';
import Layout from 'components/CLayout/Layout';
import { Alert, Animated, Image, ScrollView, StyleSheet, View } from 'react-native';
import { device, scale } from 'device';
import { colors, fonts, images } from 'assets';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'assets/theme/ThemeContext';
import { Button, Text } from 'components';
import { goBack, navigate } from 'navigation/RootNavigation';
import MainStackRouter from 'navigation/MainStackNavigation/MainStackRouter';

interface Props {
  route: any;
}
function AboutNovelMoreScreen({ route }: Props) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(route?.params?.item);
  const { theme, onChangeTheme } = useContext(ThemeContext);
  const [blHeader, setblHeader] = useState(false);
  const styles = style(theme);
  useEffect(() => {

  }, []);
  const gotoDetail = () => {
    navigate(MainStackRouter.DETAILNOVEL, { item: data })
  }
  const scrollY = new Animated.Value(0);
  return (
    <Layout >
      {blHeader && <Animated.View
        style={styles.containerHeaderModal}>

        <Button style={styles.btnBack}
          onPress={goBack}>
          <Image
            source={images.ic_back}
            style={styles.iconback}
            resizeMode={'contain'}
          />
        </Button>
        <Text semiBold style={styles.title}>{data?.title}</Text>
      </Animated.View>}
      <ScrollView
        showsVerticalScrollIndicator={false}

        onScroll={(e) => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
          setblHeader(e.nativeEvent.contentOffset.y > 0 ? true : false);
        }}
        style={{ paddingVertical: scale(15), backgroundColor: colors.white }}
      >
        <View style={{ marginBottom: scale(120) }}>
          <View style={styles.header}>
            <Button style={styles.btnBack}
              onPress={goBack}>
              <Image
                source={images.ic_back}
                style={[styles.iconback, { tintColor: colors.black }]}
                resizeMode={'contain'}
              />
            </Button>
          </View>
          <View style={styles.containerMain}>
            <Image source={data?.avatar}
              style={styles.avatar} />
            <Text numberOfLines={2} bold style={styles.titleMain}>[{data?.status}] {data?.title}</Text>
          </View>
          <View style={styles.content}>
            <View style={styles.row}>
              <View style={{ width: '20%' }}>
                <Text style={styles.text}>Tác giả: </Text>
              </View>
              <Text semiBold style={styles.textMain}>{data?.author}</Text>
            </View>
            <View style={styles.row}>
              <View style={{ width: '20%' }}>
                <Text style={styles.text}>Thể loại: </Text>
              </View>
              <Text semiBold style={styles.textMain}>{data?.type}</Text>
            </View>
            <View style={styles.row}>
              <View style={{ width: '20%' }}>
                <Text style={styles.text}>Đã ra:</Text>
              </View>
              <Text semiBold style={styles.textMain}>{data?.listChapter?.length}/{data?.numberChapter} chương</Text>
            </View>
            <Text bold style={{
              marginTop: scale(20),
              textAlign: 'center',
              fontSize: scale(20),
              marginBottom: scale(8)
            }}>VĂN ÁN</Text>
            <Text style={styles.textAbout}>{data?.introduce}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.btn}>
        <Button onPress={() => gotoDetail()} style={styles.btnContent}>
          <Text semiBold style={styles.title}>Bắt đầu đọc</Text>
        </Button>
        <Button onPress={() => { }} style={{
          width: '15%',
          justifyContent: 'center',
          alignItems: 'center',
          borderLeftColor: colors.white,
          borderLeftWidth: scale(2)
        }}>
          <Image source={images.cloud} style={styles.cloud} />
        </Button>
      </View>
    </Layout>
  );
}

export default AboutNovelMoreScreen;

const style = (theme: any) => StyleSheet.create({
  containerHeaderModal: {
    backgroundColor: theme.backgroundColor,
    position: 'absolute',
    zIndex: 100000,
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(15),
    borderBottomColor: colors.line,
    borderBottomWidth: scale(1),
    width: '100%',
    paddingTop: scale(10),
    paddingBottom: scale(20)
  },
  iconback: {
    width: scale(16),
    height: scale(16),
    resizeMode: 'contain',
    tintColor: theme.title,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(15)

  },
  btnBack: {
    marginRight: scale(12)
  },
  title: {
    color: theme.title,
    fontSize: scale(18)
  },
  avatar: {
    width: scale(160),
    height: scale(240),
    resizeMode: 'cover',
    borderRadius: scale(10)
  },
  containerMain: {
    alignItems: 'center',
    paddingBottom: scale(12),
    paddingHorizontal: scale(20)
  },
  titleMain: {
    color: colors.textColor,
    fontSize: scale(22),
    textAlign: 'center',
    marginTop: scale(12),
    textTransform: 'uppercase'
  },
  content: {
    backgroundColor: colors.bgContent,
    paddingHorizontal: scale(20),
    paddingVertical: scale(15),

  },
  row: {
    flexDirection: 'row',
    marginBottom: scale(6)
  },
  text: {
    fontSize: scale(18),
  },
  textMain: {
    flexWrap: 'wrap',
    width: '80%',
    fontSize: scale(18)
  },
  textAbout: {
    fontSize: scale(22),
    lineHeight: scale(30),
    textAlign: 'justify'

  },
  btn: {
    position: 'absolute',
    backgroundColor: colors.mainColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(25),
    width: '100%',
    bottom: 0,
    borderRadius: scale(30)
  },
  btnContent: {
    width: '85%',
    height: scale(48),
    justifyContent: 'center',
    alignItems: 'center'
  },
  cloud: {
    width: scale(25),
    height: scale(25),
    resizeMode: 'contain',
    tintColor: colors.white
  }

});
