import { Configuration, App } from '@midwayjs/decorator'
import * as koa from '@midwayjs/koa'
import * as axios from '@midwayjs/axios'
import * as cache from '@midwayjs/cache'
import { join } from 'path'
import { initialSSRDevProxy, getCwd } from 'ssr-common-utils'
import { WebInfoMiddleware } from './middleware/webInfo.middleware'
import { LanguageMiddleware } from './middleware/language.middleware'

const koaStatic = require('koa-static-cache')
const cwd = getCwd()

@Configuration({
	imports: [koa, axios, cache],
	importConfigs: [join(__dirname, './config')]
})
export class ContainerLifeCycle {
	@App()
	app: koa.Application

	async onReady() {
		this.app.useMiddleware([WebInfoMiddleware, LanguageMiddleware])

		this.app.use(koaStatic(join(cwd, './build'), { maxAge: 864000 }))
		this.app.use(koaStatic(join(cwd, './public'), { maxAge: 864000 }))
		this.app.use(koaStatic(join(cwd, './build/client'), { maxAge: 864000 }))

		await initialSSRDevProxy(this.app)
	}
}
