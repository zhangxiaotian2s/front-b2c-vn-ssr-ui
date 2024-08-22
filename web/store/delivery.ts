import { ref, Ref } from 'vue'
import { defineStore } from 'pinia'

export interface IuserAddress {
	address: string
	city: string
	city_name: string
	county: string
	email: string
	id: string
	is_default: string
	name: string
	province: string
	province_name: string
	surname: string
	tel: string
	zip_code: string
}
export interface IStationAddress {
	id: string
	email: string
	bin_city_name: string
	bin_province: string
	bin_province_name: string
	stage_address: string
	stage_manager: string
	stage_name: string
	stage_tel: string
	zip_code: string
}

interface Idelivery {
	userAddress: IuserAddress
	stationAddress: IStationAddress
	currentDeliveryType: string
	userId: string
}
//
export const useDeliveryStore = defineStore(
	'delivery',
	() => {
		/**
		 * 配送信息
		 * **/
		const deliveryInfo: Ref<Idelivery> = ref({
			userAddress: {} as IuserAddress,
			stationAddress: {} as IStationAddress,
			currentDeliveryType: '1', // 1快递 2 驿站
			userId: '' // 存储地址归属人的 id
		})
		// 选择配送方式
		const selectDeliveryType = (type: string) => {
			deliveryInfo.value.currentDeliveryType = type
		}
		// 选择用户地址
		const selectUserAddress = (address: IuserAddress) => {
			deliveryInfo.value.userAddress = address
		}
		// 选择站点地址
		const selectStationAddress = (address: IStationAddress) => {
			deliveryInfo.value.stationAddress = address
		}

		// 清除地址信息
		const handleLoaclDeliveryInfo = (id: string) => {
			// 非本地用户，清除地址信息
			if (deliveryInfo.value.userId != id) {
				deliveryInfo.value.userId = id
				deliveryInfo.value.currentDeliveryType = '1'
				deliveryInfo.value.userAddress = {} as IuserAddress
				deliveryInfo.value.stationAddress = {} as IStationAddress
			}
		}
		// 如果当前地址已经不再在用户地址列表中，则清除地址信息
		const filterLocalAddress = (addressList: IuserAddress[]) => {
			if (deliveryInfo.value.userAddress.id) {
				const isExist = addressList.find((item: IuserAddress) => item.id == deliveryInfo.value.userAddress.id)
				if (!isExist) {
					deliveryInfo.value.userAddress = {} as IuserAddress
				}
			}
		}

		return {
			deliveryInfo,
			filterLocalAddress,
			selectDeliveryType,
			selectUserAddress,
			selectStationAddress,
			handleLoaclDeliveryInfo
		}
	},
	{
		persist: true
	}
)
