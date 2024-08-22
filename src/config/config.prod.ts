import { MidwayConfig } from '@midwayjs/core'

const prodPath = process.env.HOME
export default {
	// use for cookie sign key, should change to your own and keep security
	midwayLogger: {
		default: {
			dir: `${prodPath}/logs/my-midway-vue3-prod`
		}
	},
	axios: {
		default: {
			baseURL: 'https://management-uat-vntp.tiens.com',
			timeout: 1000 * 60,
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				status: 'PC'
			}
		}
	}
} as MidwayConfig
