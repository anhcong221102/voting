
import MainStackNavigation from './MainStackRouter';
import { AboutNovelMoreScreen, DetailNovelScreen, HomeScreen, CreatedScreen, } from 'screens';

import BottomTabNavigation from 'navigation/BottomTabNavigation';

const { HOME, DETAILNOVEL, ABOUTMORE,CREATED, } =
  MainStackNavigation;

export const MainStackScreen = {
  [HOME]: { screen: BottomTabNavigation, title: '' },
  [ABOUTMORE]: { screen: AboutNovelMoreScreen, title: '' },
  [DETAILNOVEL]: { screen: DetailNovelScreen, title: '' },
  [CREATED]: { screen: CreatedScreen, title: '' },

}
