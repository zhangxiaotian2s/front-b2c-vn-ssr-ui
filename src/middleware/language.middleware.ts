import { Middleware, IMiddleware, Inject } from '@midwayjs/core'
import { NextFunction, Context } from '@midwayjs/koa'
import { Utils } from '../utils'
import { CacheManager } from '@midwayjs/cache'
import { HttpApiService } from '../service/httpApi'
@Middleware()
export class LanguageMiddleware implements IMiddleware<Context, NextFunction> {
	@Inject()
	utils: Utils

	@Inject()
	httpApiService: HttpApiService

	@Inject()
	cacheManager: CacheManager

	resolve() {
		return async (ctx: Context, next: NextFunction) => {
			console.log('xxxx')
			!ctx.webInfo && (ctx.webInfo = {})

			const langKey = ctx.query.lang || this.utils.getWebCookie(ctx, 'vn_lang') || 'en-US'

			ctx.webInfo.langKey = langKey
			console.log('当前语言', langKey)
			try {
				// 先从缓存中获取
				const _cacheLangMes = await this.cacheManager.get(`lang/${langKey}`)
				if (_cacheLangMes) {
					console.log('缓存中获取到多语言')
					ctx.webInfo.langMessage = _cacheLangMes
				} else {
					const languageResult = await this.httpApiService.get(`${ctx.apiPath.cmsApi.language}?langkey=${langKey}`)
					// webInfo 已经在上一个中间件注册
					ctx.webInfo.langMessage = languageResult.data
					//  语言缓存也不设置过期时间，每种语言的过期时间不一致会导致页面语言切换 每种语言翻译不及时同步。更新语言 就重新发版解决
					this.cacheManager.set(`lang/${langKey}`, languageResult.data)
				}
			} catch (e) {
				ctx.redirect('/error')
			}
			const result = await next()

			return result
		}
	}
	ignore(ctx: Context): boolean {
		return this.utils.commonIgnores(ctx) || ctx.path.indexOf('/api/') > -1
	}
}
