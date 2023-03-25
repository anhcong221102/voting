import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import { isReadyRef, navigationRef } from 'navigation/RootNavigation';

import AuthenticationNavigation from './AuthenticationNavigation';
import { useSelector } from 'react-redux';
import { RootState } from 'redux_manager/base/allReducers';
import MainStackNavigation from './MainStackNavigation';
import { colors } from 'assets';
import { ThemeContext } from 'assets/theme/ThemeContext';

const Stack = createStackNavigator();

export default function AppNavigation() {
  const { token } = useSelector((state: RootState) => state.authentication);
  const {theme} = useContext(ThemeContext)
  useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  return (
    <NavigationContainer
      onReady={() => {
        isReadyRef.current = true;
      }}
      ref={navigationRef}
      
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}>
        {/*    <Stack.Screen name="SplashScreen" component={SplashScreen} />*/}
        <Stack.Screen
          name="AuthenticationStack"
          component={AuthenticationNavigation}
        />
        <Stack.Screen name="MainStack" component={MainStackNavigation} />
        {/* <Stack.Screen name={'ModalStack'} component={ModalStack}
                      options={{cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}}/> */}
      </Stack.Navigator>
    </NavigationContainer>
    /*  <NavigationContainer
       onReady={() => {
         isReadyRef.current = true;
       }}
       ref={navigationRef}
       theme={{
         dark: false,
         colors: {
           primary: 'white',
           background: 'white',
           card: 'white',
           text: 'white',
           border: 'white',
           notification: 'white',
         },
       }}>
         <Stack.Navigator
         screenOptions={{
           headerShown: false,
           gestureEnabled: true,
         }}>
         {!token ? (
           <Stack.Screen
             name="AuthenticationStack"
             component={AuthenticationNavigation}
           />
         ) : (
           <Stack.Screen name="MainStack" component={MainStackNavigation} />
         )}
      
       </Stack.Navigator>
     </NavigationContainer> */
  );
}
