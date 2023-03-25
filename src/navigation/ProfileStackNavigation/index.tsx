import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import ProfileStackRouter from './ProfileStackRouter';
import { CheckInStackScreen } from './ProfileStackScreen';

const ProfileStack = createStackNavigator();

const ProfileNavigation = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName={ProfileStackRouter.HOME}
      screenOptions={{
        headerShown: false,
      }}>
      {Object.keys(CheckInStackScreen).map((elem: string, index) => (
        <ProfileStack.Screen
          name={elem}
          component={CheckInStackScreen[elem].screen}
          options={{
            title: CheckInStackScreen[elem].title,
          }}
          key={index}
        />
      ))}
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigation;
