import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import MainStackRouter from './MainStackRouter';
import { MainStackScreen } from './MainStackScreen';

const MainStack = createStackNavigator();

const MainNavigation = () => {
  return (
    <MainStack.Navigator
      initialRouteName={MainStackRouter.HOME}
      screenOptions={{
        headerShown: false,
      }}>
      {Object.keys(MainStackScreen).map((elem: string, index) => (
        <MainStack.Screen
          name={elem}
          component={MainStackScreen[elem].screen}
          options={{
            title: MainStackScreen[elem].title,
          }}
          key={index}
        />
      ))}
    </MainStack.Navigator>
  );
};

export default MainNavigation;
