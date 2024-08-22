import { Controller, Get, Provide, Inject } from '@midwayjs/decorator'
import { Context } from '@midwayjs/koa'
import { render } from 'ssr-core'
import { HttpApiService } from '../../../service/httpApi'

@Provide()
@Controller('/')
export class CmsHome {
	@Inject()
	ctx: Context

	@Inject()
	httpApiService: HttpApiService

	@Get('/')
	async handlerHome(): Promise<void> {
		// 渲染降级参考文档 http://doc.ssr-fc.com/docs/features$csr#%E5%A4%84%E7%90%86%20%E6%B5%81%20%E8%BF%94%E5%9B%9E%E5%BD%A2%E5%BC%8F%E7%9A%84%E9%99%8D%E7%BA%A7
		const { ctx, httpApiService } = this
		const result = await httpApiService.get(ctx.apiPath.cmsApi.home)
		ctx.homeData = result.data
		try {
			const stream = await render(this.ctx, {
				stream: true
			})
			ctx.body = stream
		} catch (error) {
			console.log('ssr error', error)
			const stream = await render(ctx, {
				stream: true,
				mode: 'csr'
			})
			ctx.body = stream
		}
	}
}
