import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export const useIndexStore = defineStore('index', () => {
	const pageMeta = reactive<any>({})
	const webInfo = reactive<any>({})
	const pageBarBack = ref(false)

	/**
	 * 获取标题
	 */
	function getPageTitle(): string {
		return pageMeta.title
	}
	/**
	 *  设置面包屑
	 */
	function setBreadcrumbs(breadcrumbs: any[]) {
		pageMeta.breadcrumbs = breadcrumbs
	}

	/**
	 * 获取面包屑
	 */
	function getBreadcrumbs() {
		return pageMeta.breadcrumbs || []
	}

	/**
	 * 设置标题
	 */
	function setPageTitle(title: string) {
		__isBrowser__ ? (document.title = title) : ''
		pageMeta.title = title
	}
	/**
	 *toolbar 的返回按钮
	 */
	function setPageBarBack(isBack: boolean) {
		pageBarBack.value = isBack
	}

	/**
	 * 获取toolbar 的返回按钮状态
	 */
	function getPageBarBack() {
		return pageBarBack
	}

	/**
	 *  存储 webInfo
	 */
	function setWebInfo(info: any) {
		Object.assign(webInfo, info)
	}

	/**
	 * 获取 webInfo
	 */
	function getWebInfo(key?: string) {
		if (key) {
			return webInfo[key]
		}
		return webInfo
	}

	return {
		webInfo,
		pageMeta,
		setBreadcrumbs,
		getBreadcrumbs,
		getWebInfo,
		setWebInfo,
		setPageTitle,
		getPageTitle,
		setPageBarBack,
		getPageBarBack
	}
})
