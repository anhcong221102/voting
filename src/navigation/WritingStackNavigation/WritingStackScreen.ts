
import WritingStackNavigation from './WritingStackRouter';
import { DetailNovelScreen, HomeScreen } from 'screens';

const { HOME, DETAILNOVEL } =
WritingStackNavigation;

export const CheckInStackScreen = {
  [HOME]: { screen: HomeScreen, title: '' },
  [DETAILNOVEL]: { screen: DetailNovelScreen, title: '' },
}
