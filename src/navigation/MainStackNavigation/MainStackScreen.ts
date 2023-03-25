
import MainStackNavigation from './MainStackRouter';
import { AboutNovelMoreScreen, DetailNovelScreen, HomeScreen } from 'screens';
import BottomTabNavigation from 'navigation/BottomTabNavigation';

const { HOME, DETAILNOVEL, ABOUTMORE } =
  MainStackNavigation;

export const MainStackScreen = {
  [HOME]: { screen: BottomTabNavigation, title: '' },
  [ABOUTMORE]: { screen: AboutNovelMoreScreen, title: '' },
  [DETAILNOVEL]: { screen: DetailNovelScreen, title: '' }
}
