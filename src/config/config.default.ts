import { MidwayConfig } from '@midwayjs/core'
import * as apiPath from './api/index'
export default {
	// use for cookie sign key, should change to your own and keep security
	keys: '1650192482948_2252',
	apiPath,
	axios: {
		default: {
			baseURL: 'https://management-vietnamip.tiens.com',
			timeout: 1000 * 60,
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				status: 'PC'
			}
		}
	}
} as MidwayConfig
