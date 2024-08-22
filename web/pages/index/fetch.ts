import request from '~/web/core/helpers/request'
export default async ({ pinia, router, ctx }) => {
	try {
		// 1  先声明承接变量
		let homeData: any = null
		if (__isBrowser__) {
			homeData = await getHomeData()
		} else {
			homeData = ctx.homeData
		}
		return { homeData }
	} catch (err) {
		console.log(err)
	}
}

const getHomeData = async () => {
	const result = await request.get('/api/index/data')
	console.log(result)
	return result.data
}
