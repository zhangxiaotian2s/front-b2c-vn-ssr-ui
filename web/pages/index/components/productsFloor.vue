<!-- 商品推荐 -->
<script lang="ts" setup>
import { t } from '@/i18n'
import { jump } from '@/utils/util'

import ProductFloorItem from './productFloorItem.vue'
/*获取父组件传入的数据*/
const props = withDefaults(defineProps<{ comData: any; title: string }>(), { comData: [], title: '' })
</script>
<template>
	<!-- 商城楼层部件 -->
	<div class="content-wrapper" v-if="comData.length > 0">
		<div class="product-area">
			<h2 class="section-title">{{ props.title }}</h2>
			<!-- 商品图片数据 -->
			<ProductFloorItem :list="comData" />
			<p class="text-center d-block mt-60 hover-text more" @click="jump(`/product/list`)">点击更多</p>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.product-area {
	padding: 40px 0;
	.section-title {
		font-weight: 600;
		font-size: 30px;
		color: #333333;
		line-height: 30px;
		margin-bottom: 15px;
		padding: 0 50px;
	}
	.more {
		font-weight: 600;
		font-size: 16px;
		color: #999999;
		line-height: 22px;
		text-decoration-line: underline;
	}
}
</style>
