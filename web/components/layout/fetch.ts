import { Params } from '~/typings/data'
import { useIndexStore } from '@/store/index'

export default async ({ pinia, router, ctx }: Params) => {
	let webInfo = ''
	const main = useIndexStore(pinia)
	if (__isBrowser__) {
		webInfo = main.getWebInfo()
	} else {
		webInfo = ctx.webInfo
		await main.setWebInfo(ctx.webInfo)
	}
	return {
		webInfo
	}
}
