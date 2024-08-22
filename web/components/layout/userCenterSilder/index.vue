<script lang="ts" setup>
import { t } from '@/i18n'
import userRouters from '@/routers/modules/uesr'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const selectMenu = (item: string) => {
	router.push(item)
}
</script>
<template>
	<div class="user-center-left-wrap">
		<el-affix :offset="50">
			<el-row class="left-menu pt-30 pb-30">
				<el-col :span="24">
					<el-menu :default-active="route.path" class="el-menu-vertical-demo" router>
						<el-sub-menu index="/user/">
							<template #title>
								<i class="iconfont icon-user menu-icon mr-10"></i>
								<span class="group-title">{{ t('personal_center') }}</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="/user/center/info">
									<span>
										{{ t('dealer_information') }}
									</span>
								</el-menu-item>
								<el-menu-item index="/user/center/address">
									<span>
										{{ t('address_management') }}
									</span>
								</el-menu-item>
							</el-menu-item-group>
						</el-sub-menu>
						<el-sub-menu index="1">
							<template #title>
								<i class="iconfont icon-eduction menu-icon mr-10"></i>
								<span class="group-title">{{ t('education_examination_information') }}</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="/user/center/eduction/video">
									<span>
										{{ t('video') }}
									</span>
								</el-menu-item>
								<el-menu-item index="/user/center/eduction/index">
									<span>
										{{ t('examination') }}
									</span>
								</el-menu-item>
							</el-menu-item-group>
						</el-sub-menu>
					</el-menu>
				</el-col>
			</el-row>
		</el-affix>
	</div>
</template>
<style lang="scss" scoped>
.user-center-left-wrap {
	width: 210px;
	background-color: #fff;
	height: 100%;
	min-height: calc(100vh - 595px - 83px - 50px);
	.menu-icon {
		font-size: 18px;
		color: #000;
	}
	.group-title {
		font-size: 16px;
		font-weight: 800;
		white-space: wrap;
		line-height: 26px;
	}
	:deep(.el-sub-menu__title) {
		height: auto;
		padding: 10px 0;
	}
	:deep(.el-menu-item-group__title) {
		padding: 0;
	}
	:deep(.el-menu-item) {
		&:hover {
			background-color: #fff;
		}
		// span {
		// 	padding: 0 20px;
		// }
		& span {
		}
		& span::after {
			content: '';
			display: block;
			width: 0;
			height: 2px;
			background-color: $main-color;
			transition: width 0.3s ease-in-out;
		}
		&.is-active span::after {
			width: 100%;
			// border-bottom: $main-color solid 1px;
		}
	}
}
</style>
