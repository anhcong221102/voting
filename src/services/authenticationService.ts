import { ServiceApi } from './request';

const login = (params: any) => {
  return ServiceApi.Post('admin/login', params);
};

export default {
  login,
};
