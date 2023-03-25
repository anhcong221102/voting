import React, { useContext, useEffect, useState } from 'react';
import Layout from 'components/CLayout/Layout';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { device, scale } from 'device';
import { colors, fonts, images } from 'assets';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'assets/theme/ThemeContext';

interface Props {
  route: any;
}
function AboutNovelMoreScreen({ route }: Props) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(route?.params?.item?.listChapter);
  const { theme, onChangeTheme } = useContext(ThemeContext);
  const styles = style(theme);
  useEffect(() => {

  }, []);

  return (
    <Layout >
      <ScrollView
        showsVerticalScrollIndicator={false}

      >

      </ScrollView>

    </Layout>
  );
}

export default AboutNovelMoreScreen;

const style = (theme: any) => StyleSheet.create({


});
