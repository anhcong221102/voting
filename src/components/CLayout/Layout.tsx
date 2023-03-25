import React, { useContext } from 'react';
import { StyleSheet, StatusBar, StatusBarStyle } from 'react-native';
import { colors } from 'assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from 'assets/theme/ThemeContext';

type LProps = {
  children: React.ReactNode;
  bgColor?: string;
  statusBgColor?: string;
  barStyle?: StatusBarStyle;
  edges?: any;
};

const defaultEdges = ['right', 'top', 'left', 'bottom'];

const Layout = ({
  children,
  bgColor,
  statusBgColor,
  barStyle = 'dark-content',
  edges = defaultEdges,
}: LProps) => {
  const { theme, onChangeTheme } = useContext(ThemeContext);
  return (
    <SafeAreaView
      edges={edges}
      style={[{ backgroundColor: theme.backgroundColor }, styles.layout]}>

      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
});

export default Layout;
