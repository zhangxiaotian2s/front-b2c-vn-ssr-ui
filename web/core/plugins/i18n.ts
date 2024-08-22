import { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { useI18n } from 'vue-i18n'
// import { useIndexStore } from '@/store/index'
// import { usePinia } from 'ssr-common-utils'
// const pinia = usePinia()
// const languageMes = useIndexStore(pinia).getWebInfo('languageMes')
// const messages = {}

const i18n = (locale: string, message: any): any => {
	return createI18n({
		legacy: false,
		locale: locale,
		globalInjection: true,
		messages: {
			[locale]: message
		}
	})
}
/**
 * 初始化 i18n
 */
const initI18n = (App: App, webInfo) => {
	if (!webInfo) {
		return
	}
	App.use(i18n(webInfo.langKey, webInfo.langMessage))
}

export default initI18n
