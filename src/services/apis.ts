/* eslint-disable prettier/prettier */
import network from 'services/network';
import { ServiceApi } from './request';
export type NetworkPromiseResponse<T> = Promise<T>;
import qs from 'qs';


function activeCodeAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .unAuthorizedRequest('store/check-active-code', 'POST', params)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}
function getOTP<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .unAuthorizedRequest('otp/get-otp', 'POST', params)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}
function checkOTP<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .unAuthorizedRequest('otp/check-otp', 'POST', params)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function checkNumberStore<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .unAuthorizedRequest('store/check-store-number', 'POST', params)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function activate<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .unAuthorizedRequest('store/activate', 'POST', params)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function login<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .unAuthorizedRequest('admin/login', 'POST', params)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }

        if (res && res.jwt) {
          network.setToken(res.jwt);
        }

        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function register<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .unAuthorizedRequest('store/register', 'POST', params)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}


function getStateAndCityAPI<T>(): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .unAuthorizedRequest('cities/list', 'GET')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function getPromotionList<T>(): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    ServiceApi.Get('promotion/list', 'GET')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}
function getPromotionDetail<T>(params: string): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    ServiceApi.Get(`promotion/${params}`, 'GET')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}
function updatePromotion<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    ServiceApi.Patch(`promotion/${params.id}`, 'PATCH', params.body)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function deletePromotion<T>(params: string): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    ServiceApi.Delete(`promotion/${params}`, 'DELETE')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function createPromotion<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    ServiceApi.Post(`promotion/create`, 'POST', params)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function getServicesList<T>(): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    ServiceApi.Get('service/list', 'GET')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function getDetailEmployee<T>(params: string): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    ServiceApi.Get(`employee/detail/${params}`, 'GET')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function updateSalary<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    ServiceApi.Patch(`employee/update-salary/${params.id}`, 'PATCH', params.body)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function updateProfile<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    ServiceApi.Patch(`employee/update-info/${params.id}`, 'PATCH', params.body)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function updateProfileCus<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    ServiceApi.Patch(`customer/update/${params.id}`, 'PATCH', params.body)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function createCus<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    ServiceApi.Post(`customer/add`, 'POST', params)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function updateAvatarAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .authorizedRequest(`upload/images`, 'POST', params)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function updateAvatarCus<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    ServiceApi.Patch(`customer/update-avatar/${params.id}`, 'PATCH', params.body)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function getPositionList<T>(): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    ServiceApi.Get('position/list', 'GET')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function updatePinCode<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .authorizedRequest(`admin/change-pincode`, 'PUT', params)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function getServicesCategoryAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .authorizedRequest(`category/list?` + qs.stringify(params), 'GET')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function getServicesAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .authorizedRequest(`category/` + params, 'GET')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function getTechniciansAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .authorizedRequest(`employee/list?` + qs.stringify(params), 'GET')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function getBookingDashboardAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .authorizedRequest(`booking/dashboard-home?filter=` + params, 'GET')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}
function campaignHappyBirthDayAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .authorizedRequest(`campaign/happy-birthday`, 'POST', params)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}


function getBookingDetailAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .authorizedRequest(`booking/detail/` + params, 'GET')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function campaignAnnouncementEmailAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .authorizedRequest(`campaign/announcement-email`, 'POST', params)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function updateBookingAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .authorizedRequest(`booking/update/` + params._id, 'PUT', params)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function checkoutBookingAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .authorizedRequest(`booking/check-out`, 'POST', params)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function servingBookingPaymentAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .authorizedRequest(`booking/payment`, 'POST', params)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function campaignAnnouncementServiceAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .authorizedRequest(`campaign/announcement-new-service`, 'POST', params)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function getBookingServingAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .authorizedRequest(`booking/list-serving?` + qs.stringify(params), 'GET')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function getBookingCheckoutsAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .authorizedRequest(`booking/list-checkout?` + qs.stringify(params), 'GET')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}
function deleteBookingAPI<T>(params: string): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    ServiceApi.Delete(`booking/delete/${params}`, 'DELETE')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function getListServiceCusUsedAPI<T>(params: string): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .authorizedRequest(`customer/list-service-used?customerId=${params}`, 'GET')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function sendEmailServicedAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .authorizedRequest(`customer/send-email-service-used`, 'POST', params)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function sendReceiptAPI<T>(params: string): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network.authorizedRequest(`booking/send-receipt`, 'POST', params)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function listTechniciansRatingAPI<T>(params: string): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network.authorizedRequest(`rating/list-technician?bookingId=` + params, 'GET')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function rateTechniciansAPI<T>(params: string): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network.authorizedRequest(`rating/review`, 'POST', params)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}
function DetailSalaryAPI<T>(params: string): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network.authorizedRequest(`employee/payment-history/` + params, 'GET')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}
function getListTransactionAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .authorizedRequest(`transaction/list?` + qs.stringify(params), 'GET')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function updateStoreInfoAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .authorizedRequest(`admin/update-information-store`, 'PUT', params)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function getStoreInfoAPI<T>(): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .authorizedRequest(`admin/information-store`, 'GET')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}
function paySalaryAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network.authorizedRequest(`employee/payment/${params.id}`, 'POST', params.body)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function bestServicesOfMonthAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network.authorizedRequest(`booking/best-service?` + qs.stringify(params), 'GET')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function bestEmployeeLastMonthAPI<T>(): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network.authorizedRequest(`booking/best-employee`, 'GET')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function getTotalEarnSalaryAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network.authorizedRequest(`employee/total-earn/${params.id}?` + qs.stringify(params.body), 'GET')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function getTotalEarnByCategoriesAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network.authorizedRequest(`booking/total-earn-by-category?` + qs.stringify(params), 'GET')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function getBookingDashboardStaffAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .authorizedRequest(`booking/dashboard-home-staff?filter=` + params, 'GET')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function getUpComingServicesStaffAPI<T>(): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .authorizedRequest(`booking/upcoming-service-staff`, 'GET')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function getTotalEarnAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network.authorizedRequest(`booking/total-earn?` + qs.stringify(params), 'GET')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function updateFCMTokenAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .authorizedRequest(`admin/update-token-firebase`, 'PUT', params)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function getListNotificationAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .authorizedRequest(`notification/list?` + qs.stringify(params), 'GET')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function markReadNotificationAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .authorizedRequest(`notification/mark-read`, 'POST', params)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function countUnreadNotificationsAPI<T>(): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .authorizedRequest(`notification/count`, 'GET')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function checkPromotionAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .authorizedRequest(`promotion/check`, 'POST', params)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}
function deleteExpense<T>(params: string): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    ServiceApi.Delete(`expense/delete/${params}`, 'DELETE')
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function updateServicesAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .authorizedRequest(`booking/update-service`, 'PUT', params)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function deleteServicesAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    network
      .authorizedRequest(`booking/delete-service`, 'DELETE', params)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function getBookingListAPI<T>(params: any): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    ServiceApi
      .Get(`booking/list-booking?date=${params.date}&customerFrom=${params.customerFrom}`)
      .then((res: any) => {
        if (!res || (res && res.status >= 400)) {
          return reject(res);
        }
        resolve(res as any);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}


export default {
  login,
  register,
  getStateAndCityAPI,
  activeCodeAPI,
  getOTP,
  activate,
  checkOTP,
  checkNumberStore,
  getPromotionList,
  getPromotionDetail,
  updatePromotion,
  deletePromotion,
  createPromotion,
  getServicesList,
  getDetailEmployee,
  updateSalary,
  updateProfile,
  updateProfileCus,
  createCus,
  updateAvatarAPI,
  updateAvatarCus,
  getPositionList,
  updatePinCode,
  getServicesCategoryAPI,
  getServicesAPI,
  getTechniciansAPI,
  getBookingDashboardAPI,
  getBookingDetailAPI,
  campaignHappyBirthDayAPI,
  campaignAnnouncementEmailAPI,
  updateBookingAPI,
  checkoutBookingAPI,
  servingBookingPaymentAPI,
  campaignAnnouncementServiceAPI,
  getBookingServingAPI,
  getBookingCheckoutsAPI,
  deleteBookingAPI,
  getListServiceCusUsedAPI,
  sendEmailServicedAPI,
  sendReceiptAPI,
  listTechniciansRatingAPI,
  rateTechniciansAPI,
  DetailSalaryAPI,
  getListTransactionAPI,
  updateStoreInfoAPI,
  getStoreInfoAPI,
  paySalaryAPI,
  bestServicesOfMonthAPI,
  bestEmployeeLastMonthAPI,
  getTotalEarnSalaryAPI,
  getTotalEarnByCategoriesAPI,
  getBookingDashboardStaffAPI,
  getTotalEarnAPI,
  getUpComingServicesStaffAPI,
  updateFCMTokenAPI,
  getListNotificationAPI,
  markReadNotificationAPI,
  countUnreadNotificationsAPI,
  checkPromotionAPI,
  deleteExpense,
  updateServicesAPI,
  deleteServicesAPI,
  getBookingListAPI
};
