import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { AxiosCanceler } from './helper/axiosCancel'
import { ResultData } from './helper/interface'
const axiosCanceler = new AxiosCanceler()

const config = {
	// 默认地址请求地址，可在 .env 开头文件中修改
	baseURL: '/',
	// 设置超时时间（10s）
	timeout: 60000
	// 跨域时候允许携带凭证
	// withCredentials: true
}

class RequestHttp {
	service: AxiosInstance
	public constructor(config: AxiosRequestConfig) {
		// 实例化axios
		this.service = axios.create(config)

		/**
		 * @description 请求拦截器
		 * 客户端发送请求 -> [请求拦截器] -> 服务器
		 * token校验(JWT) : 接受服务器返回的token,存储到redux/本地储存当中
		 */
		this.service.interceptors.request.use(
			(config: any) => {
				const commonHeader = {}
				return { ...config, headers: { ...config.headers, ...commonHeader } }
			},
			(error: AxiosError) => {
				return Promise.reject(error)
			}
		)

		/**
		 * @description 响应拦截器
		 *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
		 */
		this.service.interceptors.response.use(
			(response: AxiosResponse) => {
				const { data, config } = response
				const _successCode = (config as any)?.successCode || '200'
				// console.log('ssss' _successCode.includes(data.code))
				// * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
				if (data.code && !_successCode.includes(data.code)) {
					return Promise.reject(data)
				}

				// * 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
				return data
			},
			async (error: AxiosError) => {
				axiosCanceler.removePending(config)
				return Promise.reject(error)
			}
		)
	}

	// * 常用请求方法封装
	get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.get(url, { params, ..._object })
	}
	post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.post(url, params, _object)
	}
	put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.put(url, params, _object)
	}
	delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
		return this.service.delete(url, { params, ..._object })
	}
}

export default new RequestHttp(config)
