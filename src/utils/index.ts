import { Provide, Scope, ScopeEnum } from '@midwayjs/core'
import { Context } from '@midwayjs/koa'
@Provide('Utils')
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class Utils {
	/**
	 * @description 过滤开发环境下因为热更新导致的 中间件访问记录 ,要在所有过滤条件的最后执行
	 */
	commonIgnores(ctx: Context) {
		const skipExt = [
			'.png',
			'.jpeg',
			'.jpg',
			'.ico',
			'.gif',
			'.woff',
			'.ttf',
			'.eot',
			'.js',
			'.svg',
			'.css',
			'.mp4',
			'.mp3',
			'.css',
			'.map',
			'.ts',
			'vite',
			'pnpm',
			'vue'
		]
		return skipExt.some(param => ctx.path.indexOf(param) > -1)
	}

	/**
	 * @description 从服务端保存cookie到客户端
	 * @param ctx Context
	 * @param key string
	 * @param value string
	 * @param maxAge number 默认一年
	 */
	saveWebCookie(
		ctx: Context,
		key: string,
		value: string,
		opts?: { path?: string; signed?: boolean; httpOnly?: boolean; maxAge?: number }
	) {
		ctx.cookies.set(key, value, {
			path: '/',
			signed: false,
			httpOnly: false,
			maxAge: 1000 * 60 * 60 * 24 * 365,
			...opts
		})
	}
	/**
	 * @description 从服务端删除客户端cookie
	 * @param ctx Context
	 * @param key string
	 */
	deleteWebCookie(ctx: Context, key: string) {
		ctx.cookies.set(key, null, {
			path: '/',
			signed: false,
			httpOnly: false,
			maxAge: 0
		})
	}
	/**
	 * @description 从服务端删除客户端用户信息相关cookie
	 * @param ctx Context
	 * @param key string
	 */
	deleteUserWebCookie(ctx: Context) {
		ctx.cookies.set('c_uid', null, {
			path: '/',
			signed: false,
			httpOnly: false,
			maxAge: 0
		})
		ctx.cookies.set('c_token', null, {
			path: '/',
			signed: false,
			httpOnly: false,
			maxAge: 0
		})
		ctx.cookies.set('c_did', null, {
			path: '/',
			signed: false,
			httpOnly: false,
			maxAge: 0
		})
		ctx.cookies.set('c_distributor_country', null, {
			path: '/',
			signed: false,
			httpOnly: false,
			maxAge: 0
		})
	}
	/**
	 * @description 从服务获取客户端cookie
	 * @param ctx Context
	 * @param key string
	 */
	getWebCookie(ctx: Context, key: string): string {
		const value = ctx.cookies.get(key, {
			signed: false
		})
		if (value) {
			return decodeURIComponent(value)
		} else {
			return ''
		}
	}
	/**
	 * @description 获取请求的基础信息
	 * @param ctx Context
	 */
	getCtxRequestLogInfo(ctx: Context) {
		const { method, url, headers, ip, ips, body } = ctx.request
		return {
			client: {
				method,
				url,
				headers,
				ip,
				ips,
				// query,
				body
			},
			server: {
				...ctx.ApiRequestInfo
			}
		}
	}
	/**
	 * @description  跳转到 error 页面
	 * @param ctx Context
	 */
	redirectError(ctx: Context) {
		ctx.redirect('/error?backurl=' + encodeURIComponent(ctx.href))
	}
}
