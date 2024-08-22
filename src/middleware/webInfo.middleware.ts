import { Middleware, IMiddleware, App, Inject } from '@midwayjs/core'
import { NextFunction, Context, Application } from '@midwayjs/koa'
import { Utils } from '../utils'

@Middleware()
export class WebInfoMiddleware implements IMiddleware<Context, NextFunction> {
	@App()
	app: Application

	@Inject()
	utils: Utils

	resolve() {
		return async (ctx: Context, next: NextFunction) => {
			// 在ctx 上扩展出webInfo 用于存放web端的基础配置信息
			ctx.webInfo = {}
			// 将 apiPath 配置信息到 ctx 上方便后面上下文获取
			ctx.apiPath = this.app.getConfig().apiPath

			// 在ctx 上扩展出webRequestHeader 用于存放web端的请求头信息
			ctx.webRequestHeader = {}

			this.saveWebRequestHeader(ctx)
			const result = await next()
			// 控制器之后执行的逻辑

			// 返回给上一个中间件的结果
			return result
		}
	}
	// 存储 web 端请求头信息到 ctx
	async saveWebRequestHeader(ctx: Context) {
		const sourcefrom = ctx.query.sourcefrom || this.utils.getWebCookie(ctx, 'sourcefrom')
		const sourcedid = ctx.query.sourcedid || this.utils.getWebCookie(ctx, 'sourcedid')
		const uid = this.utils.getWebCookie(ctx, 'vn_uid')
		const token = this.utils.getWebCookie(ctx, 'vn_token')
		const Distributorid = this.utils.getWebCookie(ctx, 'vn_distributorid')
		const province = this.utils.getWebCookie(ctx, 'vn_province')
		const city = this.utils.getWebCookie(ctx, 'vn_city')

		Object.assign(ctx.webRequestHeader, {
			sourcefrom,
			sourcedid,
			uid,
			token,
			Distributorid,
			province,
			city
		})
	}

	// 过滤掉不需要的请求
	ignore(ctx: Context): boolean {
		return this.utils.commonIgnores(ctx)
	}
}
