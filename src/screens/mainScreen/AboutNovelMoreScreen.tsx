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
      <View><Text>asd</Text></View>
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
