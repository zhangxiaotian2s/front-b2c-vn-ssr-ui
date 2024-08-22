import { Inject, Controller, Get } from '@midwayjs/decorator'
import { Context } from '@midwayjs/koa'
import { HttpApiService } from '../../../service/httpApi'

@Controller('/api/index')
export class CmsCommonApi {
	@Inject()
	ctx: Context

	@Inject()
	httpApiService: HttpApiService

	@Get('/data')
	async getHomeData() {
		const { ctx, httpApiService } = this
		const result = await httpApiService.get(ctx.apiPath.cmsApi.home)
		return result
	}
}
