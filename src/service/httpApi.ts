import { Inject, Provide, Scope, ScopeEnum } from '@midwayjs/core'
import { Context } from '@midwayjs/koa'
import { Utils } from '../utils'
import { HttpService } from '@midwayjs/axios'
import { BadRequestError } from '@midwayjs/core/dist/error/http'

interface IOpts {
	successCode?: number
	successCodes?: number[]
}
interface IApiInfo {
	url?: string
	params?: any
	opts?: IOpts
	method?: string
}

@Provide()
@Scope(ScopeEnum.Singleton)
export class HttpApiService {
	@Inject()
	ctx: Context

	@Inject()
	utils: Utils

	@Inject()
	httpService: HttpService

	handleResult(result, obj: IApiInfo) {
		// 固定200 必为成功
		const { opts } = obj
		if (result.code === 200) {
			return result
		}
		// 可以传入 successCode， 用于判断成功的code
		if (opts && opts.successCode && opts.successCode.toString().includes(result.code)) {
			return result
		}
		// 可以传入 successCodes 数组， 用于判断多个成功的code
		if (opts && opts.successCodes && opts.successCodes.includes(result.code)) {
			return result
		}
		this.handleError(result.msg || result.data, obj)
	}
	handleError(result, obj: IApiInfo) {
		// 由于 BadRequestError 传递的信息有限， 所以上线文中 存储 ApiLoggerInfo 字段存储相关接口请求信息 在 filter 出拦截取出统一存入日志
		this.ctx.ApiRequestInfo = {
			...obj,
			header: this.ctx.webRequestHeader
		}
		//  走非接口的页面级别的请求不会执行 经过测试发现 throw 不执行 或者是被框架屏蔽了 ，导致 filter 不会被执行 日志不能被记录 所以额外判断下 独立加上日志记录
		if (this.ctx.path.indexOf('/api/') == -1) {
			this.ctx.logger.error({ message: result, ...this.utils.getCtxRequestLogInfo(this.ctx) })
		}
		throw new BadRequestError(result)
	}

	async get(url: string, params?: any, opts?: {}) {
		try {
			const result = await this.httpService.get(url, { params, headers: this.ctx.webRequestHeader, ...opts })
			return this.handleResult(result.data, { url, params, opts: opts, method: 'get' })
		} catch (e) {
			return {}
			this.handleError(e?.response?.data?.msg || (e?.response?.data && JSON.stringify(e?.response?.data)) || e, {
				method: 'get',
				url,
				params,
				opts
			})
		}
	}

	async post(url: string, params?: any, opts?: {}) {
		try {
			const result = await this.httpService.post(url, params, { headers: this.ctx.webRequestHeader, ...opts })
			return this.handleResult(result.data, { url, params, opts, method: 'post' })
		} catch (e) {
			this.handleError(e?.response?.data?.msg || (e?.response?.data && JSON.stringify(e?.response?.data)) || e, {
				method: 'post',
				url,
				params,
				opts
			})
		}
	}

	async put(url: string, params?: any, opts?: {}) {
		try {
			const result = await this.httpService.put(url, params, { headers: this.ctx.webRequestHeader, ...opts })
			return this.handleResult(result.data, { url, params, opts, method: 'put' })
		} catch (e) {
			this.handleError(e?.response?.data?.msg || (e?.response?.data && JSON.stringify(e?.response?.data)) || e, {
				method: 'put',
				url,
				params,
				opts
			})
		}
	}

	async delete(url: string, params?: any, opts?: {}) {
		try {
			const result = await this.httpService.delete(url, { params, headers: this.ctx.webRequestHeader, ...opts })
			return this.handleResult(result.data, { url, params, opts, method: 'delete' })
		} catch (e) {
			this.handleError(e?.response?.data?.msg || (e?.response?.data && JSON.stringify(e?.response?.data)) || e, {
				method: 'delete',
				url,
				params,
				opts
			})
		}
	}
}
