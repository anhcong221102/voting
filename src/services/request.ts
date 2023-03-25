/* eslint-disable  @typescript-eslint/no-explicit-any */

import { StyleSheet } from 'react-native';
import Axios, { AxiosRequestConfig } from 'axios';

import { Action } from 'redux';
import { createRef } from 'react';

import {allActions, store } from 'redux_manager';
import { onLogout } from 'redux_manager/authentication/authenticationReducer';

import { Config } from 'utils';

//redux
type AppDispatchType = {
  dispatch: (action: ActionBase) => void;
};

type ActionBase = Action<string>;
const dispatchRef = createRef<AppDispatchType>();

export const dispatch = (action: ActionBase) => {
  if (dispatchRef.current) {
    dispatchRef.current.dispatch(action);
  }
};

const tokenKeyHeader = 'api-token';
const AxiosInstance = Axios.create({});

AxiosInstance.interceptors.response.use(
  response => response,
  async function (error) {
    const originalRequest = error.config;
    if (
      error &&
      error.response &&
      (error.response.status === 403 || error.response.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      return AxiosInstance(originalRequest);
    }
    return Promise.reject(error.response);
  },
);

async function Request(config: AxiosRequestConfig, isCheckOut = true) {
  const defaultConfig: AxiosRequestConfig = {
    baseURL: Config.ROOT_HTTP,
    timeout: 10000,
    headers: config.headers
      ? config.headers
      : {
          'Content-Type': 'application/json',
          [tokenKeyHeader]: `${
            store.getState().authentication?.token
              ? store.getState().authentication?.token
              : ''
          }`,
        },
  };
  return AxiosInstance.request(StyleSheet.flatten([defaultConfig, config]))
    .then((res: any) => {
      if (res.data?.code > 0) {
        return res.data;
      }
      return Promise.reject(res);
    })
    .catch((error: any) => {
      if(error && error.status && error.status === 400){
        store?.dispatch(allActions.main.tokenExpire())
        return Promise.reject(error);
      }
      if (error?.data?.code === 401 && isCheckOut) {
        store?.dispatch(onLogout())
        return Promise.reject(error);
      } else {
        return Promise.reject(error.data);
      }
    });
}

// get
function Get(url: string, param?: any) {
  return Request({ url: url, params: param, method: 'GET' });
}

// post
function Post(url: string, data?: any, params?: any) {
  return Request({ url: url, data: data, params: params, method: 'POST' });
}

// post file
function PostWithFile(
  url: string,
  file: any,
  // onUploadProgress: (progressEvent: number) => void,
) {
  const header: any = {
    'Content-Type': 'multipart/form-data',
    [tokenKeyHeader]: `${
      store.getState().authentication?.token
        ? store.getState().authentication?.token
        : ''
    }`,
  };
  return Request({
    url: url,
    data: file,
    method: 'POST',
    headers: header,
    // onUploadProgress: function (progressEvent) {
    //    onUploadProgress(
    //       Math.round((100 * progressEvent.loaded) / progressEvent.total),
    //    )
    //    // Do whatever you want with the native progress event
    // },
  });
}

// put
function Put(url: string, data: any, params?: any) {
  return Request({ url: url, data: data, params: params, method: 'PUT' });
}
function Patch(url: string, data: any, params?: any): any {
  return Request({ url: url, data: data, params: params, method: 'PATCH' });
}

// delete
function Delete(url: string, params?: any) {
  return Request({
    url: url,
    params: params,
    method: 'DELETE',
  });
}

export const ServiceApi = {
  Get,
  Post,
  Put,
  Delete,
  PostWithFile,
  Patch,
};
