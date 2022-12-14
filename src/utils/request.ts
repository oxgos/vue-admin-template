import axios, { AxiosError, AxiosResponse } from "axios";

interface Response {
  code: number;
  message: string;
}

axios.create({
  timeout: 5000,
});

axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    (config.headers as any)["Authentication"] = "XXXXXXXXXXX";
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response: AxiosResponse<Response, any>) => {
    // Do something with response data
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export const RES_OK = 200;
export const RES_ERROR = 400;
export default axios;
