import { ref, Ref } from 'vue'
// import { useI18n } from 'vue-i18n'

import { ElNotification } from 'element-plus'
import { defineStore } from 'pinia'
import { checkLoign } from '@/utils/util'

// import { notify } from '@kyvg/vue3-notification'

// const { t } = useI18n()

export interface IAddCartParams {
	goods_id: string
	num: number
}

export const useCartStore = defineStore('cart', () => {
	/**
	 * 购物车
	 * **/
	const cartInfo: Ref<any> = ref({
		total_num: 0,
		list: []
	})

	const addShopCart = async (params: IAddCartParams) => {
		// 添加购物车 没有登录跳转到登录页
		if (!checkLoign()) {
			location.href = '/user/loginandregest?redirect=' + encodeURIComponent(location.href)
			return
		}
		// 添加购物车
		try {
			// await addToCart(params)
			await getMiniCartInfo()
			// ElNotification({
			// 	title: '提示--词条?',
			// 	message: t('mes_add_shopcart_success'),
			// 	position: 'bottom-right',
			// 	type: 'success'
			// })
		} catch (e: any) {
			// ElNotification({
			// 	title: '提示--词条?',
			// 	message: e.msg || t('error_add_shopcart_fail'),
			// 	position: 'bottom-right',
			// 	type: 'error'
			// })
		}
	}
	/** 获取迷你购物车 */
	const getMiniCartInfo = async () => {
		// const result = await getMiniCart()
		// cartInfo.value = result.data
	}
	/** 删除购物车指定商品 */
	const deleteCartGoodsItem = async (id: string) => {
		try {
			// await deleteCartGoods({ id })
			await getMiniCartInfo()
		} catch (e: any) {
			// ElNotification({
			// 	title: '提示--词条?',
			// 	message: e.msg,
			// 	position: 'bottom-right',
			// 	type: 'warning'
			// })
		}
	}
	return {
		cartInfo,
		addShopCart,
		getMiniCartInfo,
		deleteCartGoodsItem
	}
})
