import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
export interface IUserInfo {
	DISTRIBUTOR_ID_uuid: string
	INTRODUCE_ID_uuid: string
	PLACEMENT_ID_uuid: string
	SPONSOR_ID_uuid: string
	address: string
	avatar: string
	bin_institution: string
	bin_institution_code: string
	bin_institution_name: string
	birthday: string
	city: string
	city_name: string
	document_idcard: string
	document_type: string
	email: string
	gender: string
	is_activate: 1 | 0
	is_exam_power: 1 | 0
	is_train: 1 | 0
	mobile: string
	province: string
	province_name: string
	system_type: string
	token: string
	uid: string
	username: string
}
export const useUserStore = defineStore('user', () => {
	/**
	 * 迷你购物车
	 * **/

	const userInfo = ref({} as IUserInfo)
	const loginUserId = ref('')
	const loginToken = ref('')
	const distributorid = ref('')

	/** 存储用户信息 */
	const saveUserInfo = (userData: IUserInfo) => {
		userInfo.value = userData
		__isBrowser__ ? localStorage.setItem('vn_userInfo', JSON.stringify(userData)) : ''
	}
	/** 记住当前登录永恒 */
	const saveLoginInfo = (loginInfo: { uid: string; token: string; distributorid: string }) => {
		loginUserId.value = loginInfo.uid
		loginToken.value = loginInfo.token
		distributorid.value = loginInfo.distributorid
		if (__isBrowser__) {
			Cookies.set('vn_token', loginInfo.token)
			Cookies.set('vn_uid', loginInfo.uid)
			Cookies.set('vn_distributorid', loginInfo.distributorid)
		}
	}

	/** 退出登录 */
	const loginOut = () => {
		userInfo.value = {} as IUserInfo
		if (__isBrowser__) {
			localStorage.removeItem('vn_userInfo')
			Cookies.remove('vn_token')
			Cookies.remove('vn_uid')
			Cookies.remove('vn_distributorid')
		}
	}

	return {
		userInfo,
		loginUserId,
		loginToken,
		distributorid,
		loginOut,
		saveUserInfo,
		saveLoginInfo
	}
})
