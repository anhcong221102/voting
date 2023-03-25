import { CommonActions, useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { allActions } from 'redux_manager';
import { useDispatch } from 'react-redux';
import { network } from 'services';

export default function SplashScreen() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  useEffect(() => {
     getAccessToken();
    
  }, []);

  const getAccessToken = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    if (access_token) {
      network.setToken(access_token);
      dispatch(
        allActions.user.getInformation(null, async (error: any, data: any) => {
          if (data) {
            navigation.dispatch(
              CommonActions.reset({ routes: [{ name: 'MainStack' }] }),
            );
          } else {
            await AsyncStorage.removeItem('access_token');
            navigation.dispatch(
              CommonActions.reset({
                routes: [{ name: 'AuthenticationStack' }],
              }),
            );
          }
        }),
      );
    } else {
      navigation.dispatch(
        CommonActions.reset({ routes: [{ name: 'AuthenticationStack' }] }),
      );
    }
  };

  return <View />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
