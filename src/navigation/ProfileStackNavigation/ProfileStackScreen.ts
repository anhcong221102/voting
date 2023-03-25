
import ProfileStackNavigation from './ProfileStackRouter';
import { DetailNovelScreen, HomeScreen } from 'screens';

const { HOME, DETAILNOVEL } =
ProfileStackNavigation;

export const CheckInStackScreen = {
  [HOME]: { screen: HomeScreen, title: '' },
  [DETAILNOVEL]: { screen: DetailNovelScreen, title: '' }
}
