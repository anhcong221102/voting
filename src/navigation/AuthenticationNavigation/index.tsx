import React from 'react';
import { AuthenticationScreen } from './AuthenticationScreen';
import AuthenticationRouter from './AuthenticationRouter';
import { createStackNavigator } from '@react-navigation/stack';

const AuthenticationStack = createStackNavigator();

const AuthenticationNavigation = () => {
  return (
    <AuthenticationStack.Navigator
      initialRouteName={AuthenticationRouter.LOGIN}
      screenOptions={{
        headerShown: false,
      }}>
      {Object.keys(AuthenticationScreen).map((elem: string, index) => (
        <AuthenticationStack.Screen
          name={elem}
          component={AuthenticationScreen[elem].screen}
          options={{
            title: AuthenticationScreen[elem].title,
            // headerShown: elem === AuthenticationRouter.WELCOME ? false : true,
          }}
          key={index}
        />
      ))}
    </AuthenticationStack.Navigator>
  );
};

export default AuthenticationNavigation;
