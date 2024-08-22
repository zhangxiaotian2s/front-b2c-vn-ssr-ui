import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ResultData } from './helper/interface';
declare class RequestHttp {
    service: AxiosInstance;
    constructor(config: AxiosRequestConfig);
    get<T>(url: string, params?: object, _object?: {}): Promise<ResultData<T>>;
    post<T>(url: string, params?: object, _object?: {}): Promise<ResultData<T>>;
    put<T>(url: string, params?: object, _object?: {}): Promise<ResultData<T>>;
    delete<T>(url: string, params?: any, _object?: {}): Promise<ResultData<T>>;
}
declare const _default: RequestHttp;
export default _default;
