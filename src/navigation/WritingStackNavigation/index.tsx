import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import WritingStackRouter from './WritingStackRouter';
import { CheckInStackScreen } from './WritingStackScreen';

const WritingStack = createStackNavigator();

const WritingNavigation = () => {
  return (
    <WritingStack.Navigator
      initialRouteName={WritingStackRouter.HOME}
      screenOptions={{
        headerShown: false,
      }}>
      {Object.keys(CheckInStackScreen).map((elem: string, index) => (
        <WritingStack.Screen
          name={elem}
          component={CheckInStackScreen[elem].screen}
          options={{
            title: CheckInStackScreen[elem].title,
          }}
          key={index}
        />
      ))}
    </WritingStack.Navigator>
  );
};

export default WritingNavigation;
