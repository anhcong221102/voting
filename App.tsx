
import React, { useEffect, useState } from 'react';
import { LogBox, Platform, StatusBar } from 'react-native';
import { AppNavigation } from 'navigation';
import { Provider } from 'react-redux';
import { store } from 'redux_manager';
import Toast from 'react-native-toast-message';
import Theme from './src/assets/theme/Theme';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from './src/assets/theme/ThemeContext';
import CodePush from 'react-native-code-push';
import SplashScreen from 'react-native-splash-screen';
import 'react-native-gesture-handler'

//import Orientation from 'react-native-orientation';

const CODE_PUSH_OPTIONS = {
  checkFrequency: CodePush.CheckFrequency.MANUAL
}
let App = () => {
  const [theme, setTheme] = useState(Theme.light);
  useEffect(() => {
    SplashScreen.hide();
    getTheme();
    CodePush.sync({
      installMode: CodePush.InstallMode.IMMEDIATE,
    }, syncWithCodePush, codePushDownloadDidProgress);
  }, []);
  const syncWithCodePush = (syncStatus: any) => {
    switch (syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        break;
    }
  }

  const codePushDownloadDidProgress = (progress: any) => {
    console.log('progress', progress);
  }

  const getTheme = async () => {
    let appTheme: any = await AsyncStorage.getItem('THEME');
    if (appTheme) {
      if (appTheme === 'light') {
        setTheme(Theme.light);
      }
      else {
        setTheme(Theme.dark);
      }

    }
  };

  const onToggleTheme = async () => {
    setTimeout(async () => {
      if (theme.type === 'light') {
        setTheme(Theme.dark);
        await AsyncStorage.setItem('THEME', 'dark');
        StatusBar.setBarStyle('light-content');
        StatusBar.setBackgroundColor(Theme.dark.header.backgroundColor);
      } else {
        setTheme(Theme.light);
        await AsyncStorage.setItem('THEME', 'light');
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor(Theme.light.header.backgroundColor);
      }
    }, 200);
  };

  const persister = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <StatusBar backgroundColor={theme.header.backgroundColor} barStyle={theme.type == 'light' ? 'dark-content' : 'light-content'} />
        <ThemeContext.Provider value={{ theme: theme, onChangeTheme: onToggleTheme }}>
          <AppNavigation />
        </ThemeContext.Provider>
        <Toast ref={ref => Toast.setRef(ref)} />
      </PersistGate>
    </Provider>
  );
};

export default CodePush(CODE_PUSH_OPTIONS)(App);
