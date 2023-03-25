import React, { useContext, useLayoutEffect, useState } from 'react';
import { BottomTabScreen } from './BottomTabScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabRouter from './BottomTabRouter';
import { scale } from 'device';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from 'assets';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { navigationRef } from 'navigation/RootNavigation';
import { useSelector } from 'react-redux';
import { RootState } from 'redux_manager/base/allReducers';
import { ThemeContext } from 'assets/theme/ThemeContext';


const BottomTab = createBottomTabNavigator();
const TabItem = ({ focused, label, icons, onPress }: any) => {
  const { theme, onChangeTheme } = useContext(ThemeContext);
  const styles = style(theme);
  const Icon = icons;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tab, !focused && styles.inactive]}>
      <View style={{ height: scale(25),alignItems:'center',justifyContent:'center' }}>
        <Icon />
      </View>
      <Text style={styles.labelStyle}>{label}</Text>
      {focused && <View style={styles.borderActive} />}
    </TouchableOpacity>
  );
};
const BottomTabNavigation = ({ navigation, route }: any) => {
  const [display, setDisplay] = useState<'none' | 'flex'>('flex');
  const profile = useSelector((state: RootState) => state.authentication.user);
  const { theme, onChangeTheme } = useContext(ThemeContext);
  const styles = style(theme);
  useLayoutEffect(() => {

  }, [navigation, route]);

  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => {
        return {
          headerShown: false,
          tabBarVisible: false,
          tabBarStyle: {
            display: display,
            borderTopWidth: scale(1),
            borderTopColor: colors.line,
            paddingTop: scale(3),
            width: '100%',
            zIndex: 0,
            backgroundColor:theme.backgroundColor

          },
          tabBarItemStyle: {

          },
        };
      }}
      initialRouteName={BottomTabRouter.HOME}>
      {Object.keys(BottomTabScreen).map((elem, index) => (
        <BottomTab.Screen
          name={elem}
          component={BottomTabScreen[elem].screen}
          options={{
            tabBarLabel: () => {
              return null;
            },
            tabBarIcon: ({ focused }) => {
              return (
                <TabItem
                  label={BottomTabScreen[elem].title}
                  focused={focused}
                  icons={BottomTabScreen[elem].icons}
                />
              );
            },
          }}

          key={index}
        />
      ))}
    </BottomTab.Navigator>
  );
};
export default BottomTabNavigation;

const style =(theme:any)=> StyleSheet.create({
  tab: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  borderActive: {
    width: scale(70),
    height: scale(3),
    backgroundColor: colors.mainColor,
    borderRadius: scale(4),
  },
  icon: {
    height: scale(22),
    width: scale(22),
  },
  inactive: {
    opacity: 0.5,
    paddingBottom: scale(3),
  },
  labelStyle: {
    fontFamily: fonts.TTCommons.medium,
    fontSize: scale(12),
    color: theme.title,

  },
});
