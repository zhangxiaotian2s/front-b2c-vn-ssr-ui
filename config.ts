import type { UserConfig } from 'ssr-types'
import { setStyle } from 'ssr-common-utils'
import ElementPlus from 'unplugin-element-plus/vite'
const userConfig: UserConfig = {
	chainBaseConfig: (chain, isServer) => {
		// setStyle 的详细入参类型可查看  https://github.com/zhangyuang/ssr/blob/dev/packages/server-utils/src/webpack/setStyle.ts
		setStyle(chain, /\.s[ac]ss$/i, {
			rule: 'sass',
			loader: 'sass-loader',
			isServer,
			importLoaders: 2 // 参考 https://www.npmjs.com/package/css-loader#importloaders
		})
	},

	css: () => {
		const autoprefixer = require('autoprefixer')
		return {
			loaderOptions: {
				postcss: {
					plugins: [autoprefixer]
				},
				// scss 配置全局引入 变量文件
				scss: {
					additionalData: `@import "@/assets/scss/style.scss";`
				}
			}
		}
	}
}

export { userConfig }
