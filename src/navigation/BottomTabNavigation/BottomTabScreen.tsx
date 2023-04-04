/* eslint-disable react-native/no-inline-styles */
import {
  IconMenuCategories,
  IconMenuCheckin,
  IconMenuHome,
  IconMenuManager,
  IconMenuStats,
  images,
} from 'assets';
import { scale } from 'device';
import ProfileNavigation from 'navigation/ProfileStackNavigation';
import WritingNavigation from 'navigation/WritingStackNavigation';
import React from 'react';
import { Image } from 'react-native-elements';
import {  HomeScreen, LibraryScreen, SearchScreen, CreatedScreen} from 'screens';
//import CheckInScreen from 'screens/checkin/CheckinScreen';

import BottomTabRouter from './BottomTabRouter';

const { HOME, SEARCH, LIBRARY, CREATED, WRITING } = BottomTabRouter;

export const BottomTabScreen = {
  [HOME]: {
    screen: HomeScreen,
    title: 'Đang chờ',
    icons: () => (
      <Image source={images.home}
        style={{
          resizeMode: 'contain',
          height: scale(22),
          width: scale(22),
        }}
      />
    ),
  },
  [SEARCH]: {
    screen: SearchScreen,
    title: 'Đã duyệt',
    icons: () => (
      <Image source={images.ic_search}
        style={{
          resizeMode: 'contain',
          height: scale(20),
          width: scale(20),
        }}
      />
    ),
  },
  [LIBRARY]: {
    screen: LibraryScreen,
    title: 'Đang live',
    icons: () => (
      <Image source={images.library}
        style={{
          resizeMode: 'contain',
          height: scale(20),
          width: scale(20),
        }}
      />
    ),
  },
 
  [WRITING]: {
    screen: WritingNavigation,
    title: 'Đã hoàn thành',
    icons: () => (
      <Image source={images.ic_writing}
        style={{
          resizeMode: 'contain',
          height: scale(22),
          width: scale(22),
        }}
      />
    ),
  },
  [CREATED]: {
    screen: CreatedScreen,
    title: 'tạo cuộc họp',
    icons: () => (
      <Image source={images.notify}
        style={{
          resizeMode: 'contain',
          height: scale(25),
          width: scale(25),
        }}
      />
    ),
  },
};
