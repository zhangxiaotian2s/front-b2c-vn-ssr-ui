<script lang="ts" setup>
import { ElAffix, ElSelect, ElOption, ElSpace, ElPopover, ElBadge } from 'element-plus'
import { inject, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { onlyCsr } from 'ssr-hoc-vue3'
import Cookies from 'js-cookie'
import { useUserStore } from '@/store/user'
import { useCartStore } from '@/store/cart'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import Minishopcart from './minishopcart.vue'

const { t } = useI18n()
const userStore = useUserStore()
const cartStore = useCartStore()
const route = useRoute()
const router = useRouter()

const { userInfo } = storeToRefs(userStore)
const { cartInfo } = storeToRefs(cartStore)
const asyncData: any = inject('asyncData')
const options = [
	{
		value: 'zh-CN',
		label: '中文'
	},
	{
		value: 'en-US',
		label: 'English'
	}
]

const currentLang = ref(asyncData.value.webInfo.langKey || 'en-US')

const handleLangChange = () => {
	Cookies.set('vn_lang', currentLang.value)
	window.location.reload()
}
const loginOut = () => {
	userStore.loginOut()
	window.location.reload()
}
const handleMiniCart = () => {
	if (cartInfo.value.total_num > 0) {
		return
	}

	router.push('/order/shopcart')
}
</script>

<template>
	<el-affix :offset="0" z-index="101" style="z-index: 100">
		<div class="page-header header-bar">
			<div class="content-wrapper d-flex h-100 align-items-center justify-content-between">
				<div class="select-reset-header-type pl-20">
					<el-select v-model="currentLang" @change="handleLangChange">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
				</div>
				<div class="header-user-cart pr-20">
					<div class="user d-flex align-items-center">
						<el-space>
							<p class="login-wrap" v-if="!userInfo.uid">
								<router-link to="/user/login" class="hover-text">{{ t('login') }}</router-link>
								<i>/</i>
								<router-link to="/user/register" class="hover-text">{{ t('register') }}</router-link>
								<!-- <i>/</i>
								<span>注销</span> -->
							</p>
							<span v-else class="iconfont icon-close pointer"></span>
							<!-- <SvgIcon name="close" size="18px" color="#fff" class="hover-svg" @click="loginOut" /> -->
							<only-csr>
								<span class="iconfont icon-shopcart-empty pointer" v-if="cartInfo.total_num == 0" @click="handleMiniCart"></span>

								<el-popover placement="bottom" :width="400" v-else-if="!route.path.includes('/order/shopcart')">
									<template #reference>
										<el-badge :show-zero="false" :value="3" class="d-flex" :offset="[5, 6]" color="#C63B36">
											<div class="shop-cart-icon d-flex align-items-center pointer">
												<span class="iconfont icon-shopcart-full"></span>
											</div>
										</el-badge>
									</template>
									<Minishopcart />
								</el-popover>
							</only-csr>
						</el-space>
					</div>
				</div>
			</div>
		</div>
	</el-affix>
</template>
<style lang="scss">
.header-bar {
	height: 50px;
	.iconfont {
		font-size: 18px;
		color: #ffffff;
	}
}

.header-user-cart {
	.user {
		color: $white;
		a {
			color: $white;
		}
	}
}

.drop-down-user-btn {
	height: 32px;
	&[aria-expanded='true'] {
		span {
			color: $assist-color-1;
		}
		use {
			fill: $assist-color-1;
		}
	}
}
.shop-cart-icon {
	height: 32px;
}
.header-bar .el-select__wrapper {
	box-shadow: none;
}
.login-wrap {
	font-weight: 600;
	font-size: 14px;
	color: #ffffff;
	margin-right: 20px;
	i {
		margin: 10px;
	}
}
</style>
