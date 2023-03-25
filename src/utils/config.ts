import {Alert, Linking} from 'react-native';
import {check, request, RESULTS} from 'react-native-permissions';
import {ERRORS} from "utils/errors";

const ROOT_HTTP = 'http://68.183.153.14/api/';
const ROOT_IMAGE = 'http://68.183.153.14/';
const ROOT_SOCKET = 'https://socket.weshops.trade';

let token = null;

const transCodeError = (message: string) => {
  if (message === 'Phone is exist') {
    return 'Số điện thoại đã được đăng ký';
  }
  if (message === 'Phone or password is not correct') {
    return 'Số điện thoại hoặc mật khẩu không chính xác';
  }
  if (message === 'This device using max 2 account') {
    return 'Thiết bị này đã đăng ký tối đa 2 tài khoản';
  }
  if (message === 'This device using max 1 account') {
    return 'Thiết bị này đã đăng ký tối đa 1 tài khoản';
  }
  if (message === 'You need update password level 2') {
    return 'Bạn chưa có mật khẩu cấp 2. Vui lòng thêm mới';
  }
  if (message === 'Password level 2 is not correct') {
    return 'Mật khẩu cấp 2 không chính xác';
  }

  return message.toString();
};

const hideBankCardNumber = (num: string) => {
  let threeLastDigits = num.substr(num.length - 3);
  let coveredDigits = num
    .substr(0, num.length - 3)
    .replace(/\d+/g, '**** **** ***  ');
  return coveredDigits + threeLastDigits;
};

const hidePhoneNumber = (tel = '') => {
  let threeDigits = tel.substr(0, 3);
  let lastTwoDigits = tel.substr(tel.length - 2);
  let coveredDigits = tel.substr(3, tel.length - 2).replace(/\d+/g, '*****');
  return threeDigits + coveredDigits + lastTwoDigits;
};

const hideWalletBalance = (money = '') => {
  let m = money.replace(/\.|,/gi, '');
  return m.replace(/\d+/g, '*****');
};

const formatPrice = (price = '') => {
  if (price?.length) {
    return price.replace(/\,/gi, '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  return price;
};

const formatDecimalNumber = function (string: any, format: number) {
  if (!string) {
    return '';
  }
  let val = '';
  let newFormat = format ? format : 0;
  let newString = string.toFixed(newFormat);
  let newStringBeforString = newString
    .split('.')[0]
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  let newStringAfterString = newString.split('.')[1];

  val = newStringBeforString;

  if (newStringAfterString && newStringAfterString.length > 0) {
    val = newStringBeforString + '.' + newStringAfterString;
  }
  return val;
};

const sumValues = (arr: any[], key: string): number => {
  return arr.reduce((a, b) => a + (b[key] || 0), 0);
};

const alertMess = function (
  data: any,
  title?: any,
  cb?: Function,
  cbCancel?: Function,
) {
  // @ts-ignore
  let messAlert = data && data.message ? data.message : data.error ? getErrors(data.error) : 'System error';
  let titleAlert = data && data.title ? data.title : 'Message';
  const arrayButton: any = [];
  if (cbCancel) {
    arrayButton.push({
      text: title && title.cancel ? title.cancel : 'Cancel',
      onPress: cbCancel,
      style: 'cancel',
    });
  }
  arrayButton.push({
    text: title && title.submit ? title.submit : 'OK',
    onPress: cb,
  });
  Alert.alert(titleAlert, !!messAlert ? messAlert : '', arrayButton, {
    cancelable: !(cb || cbCancel),
  });
};

export const getErrors = function (text: any) {
  // @ts-ignore
  return text && ERRORS[text] ? ERRORS[text] : text;
};

const validateEmail = (email: any) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailRegex.test(email);
};

const requestPermission = (permissions: any, callback: () => void) => {
  check(permissions)
    .then((result: any) => {
      if (result == RESULTS.BLOCKED || result == RESULTS.UNAVAILABLE) {
        Alert.alert('Message', 'Please grant permissions to continue', [
          {
            text: 'Cancel',
            onPress: () => {
              return;
            },
          },
          {
            text: 'Ok',
            onPress: () => {
              return Linking.openSettings();
            },
          },
        ]);
        return;
      }
      if (result == RESULTS.DENIED) {
        request(permissions).then((r: any) => {
          if (
            r == RESULTS.BLOCKED ||
            r == RESULTS.UNAVAILABLE ||
            r == RESULTS.DENIED
          ) {
            return;
          }
          callback && callback();
        });
        return;
      }
      return callback && callback();
    })
    .catch((error: any) => {
      alertMess(error);
    });
  return;
};

const getImageURL = (url: string) => {
  if (url) {
    if (url.indexOf('http') < 0) {
      if (url.charAt(0) === '/') {
        return ROOT_IMAGE + url;
      } else {
        return ROOT_IMAGE + '/' + url;
      }
    }
    return url;
  }
  return null;
};
const requestPermisson = (permissions: any, callback: () => void) => {
  check(permissions)
    .then(result => {
      if (result == RESULTS.BLOCKED || result == RESULTS.UNAVAILABLE) {
        Alert.alert('Message', 'Please grant permissions to continue', [
          {
            text: 'Cancel',
            onPress: () => {
              return;
            },
          },
          {
            text: 'Ok',
            onPress: () => {
              return Linking.openSettings();
            },
          },
        ]);
        return;
      }
      if (result == RESULTS.DENIED) {
        request(permissions).then(r => {
          if (
            r == RESULTS.BLOCKED ||
            r == RESULTS.UNAVAILABLE ||
            r == RESULTS.DENIED
          ) {
            return;
          }
          callback && callback();
        });
        return;
      }
      return callback && callback();
    })
    .catch(error => {
      Alert.alert(error.message);
    });
  return;
};

const validate = (text: string) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return reg.test(text);
};
export const REGEX_PHONE =
  /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;

const validatePhone = (text: string) => {
  return REGEX_PHONE.test(text);
};

const currencyFormat = (num: number) => {
  return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

const formatUSPhoneNumber = (phone: string) => {
  if(phone){
    const re = /(\d{3})(\d{3})(\d{4})/;
    return phone.replace(re, (_, b, c, d) => `(${b}) ${c}-${d}`)
  }
  return ''
}

const nonAccentText = (str: string) => {
  if (str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
    str = str.replace(/[^0-9a-z_\-\s#*./(\\)]/gi, '');
  }
  return str;
};

const formatSeconds = (secs: number) => {
  function pad(n: number) {
    return (n < 10 ? '0' + n : n);
  }

  const h = Math.floor(secs / 3600);
  const m = Math.floor(secs / 60) - (h * 60);
  const s = Math.floor(secs - h * 3600 - m * 60);
  if (secs > 3600) {
    return pad(h) + ':' + pad(m) + ':' + pad(s);
  } else {
    return pad(m) + ':' + pad(s);
  }
};

const formatHours = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes - (h * 60);
  if (minutes > 60) {
    return h + 'h ' + (m > 0 ? (m === 1 ? m + 'min' : m + 'mins') : '');
  } else {
    return (m > 0 ? (m === 1 ? m + 'min' : m + 'mins') : '');
  }
};

let messageId = '';

export default {
  ROOT_HTTP,
  alertMess,
  hideBankCardNumber,
  hidePhoneNumber,
  validatePhone,
  hideWalletBalance,
  formatPrice,
  formatDecimalNumber,
  sumValues,
  //ROOT_SOCKET,
  ROOT_IMAGE,
  token,
  validateEmail,
  requestPermission,
  getImageURL,
  validate,
  currencyFormat,
  requestPermisson,
  formatUSPhoneNumber,
  nonAccentText,
  formatSeconds,
  formatHours,
  messageId,
};
