import allReducers from './allReducers';
import rootSaga from './rootSaga';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import logger from "redux-logger";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['authentication', 'booking'],
};

const persistedReducer = persistReducer(persistConfig, allReducers);

const devMode = __DEV__;

const sagaMiddleware = createSagaMiddleware();
const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }),
    logger,
  sagaMiddleware,
];

const storeConfig = () => {
  const store = configureStore({
    reducer: persistedReducer,
    devTools: devMode,
    middleware,

    //load data to storage
    // preloadedstate: null,
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

export const store = storeConfig();
