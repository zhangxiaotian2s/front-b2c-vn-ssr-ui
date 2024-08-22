<script lang="ts" setup>
import Banner from './components/banner.vue'
import { onlyCsr } from 'ssr-hoc-vue3'
// import Entry from './components/entry.vue'
// import RecommendProducts from './components/recommendProducts.vue'
// import ProductsFloor from './components/productsFloor.vue'
import { inject } from 'vue'
const asyncData: any = inject('asyncData')
const homeData = asyncData.value.homeData
</script>

<template>
	<div class="">
		<!-- <el-row class="row-bg hidden-xs-only">
			<el-col :span="4" :xs="24">1</el-col>
			<el-col :span="4">2</el-col>
			<el-col :span="4">3</el-col>
		</el-row> -->

		<!-- <Banner /> -->
		<template v-for="item in homeData" v-if="homeData.length > 0">
			<!-- cms_type：’1’ banner，‘2’ 快速入口， ‘3’ 推荐商品 ‘4’ 商品楼层 -->
			<template v-if="item.cms_type == '1'">
				<onlyCsr>
					<Banner :comData="item.data" />
				</onlyCsr>
			</template>
			<!-- 快速入口 -->
			<!-- <Entry v-else-if="item.cms_type == '2'" :comData="item.data" /> -->
			<!-- 推荐商品 -->
			<!-- <RecommendProducts v-else-if="item.cms_type == '3'" :comData="item.data" /> -->
			<!-- <template> -->
			<!-- <ProductsFloor v-else-if="item.cms_type == '4'" :comData="item.data" :title="item.floor_name" /> -->
			<!-- </template> -->
		</template>
	</div>
</template>
<style lang="scss">
.main-wrap {
	padding: 0;
}
</style>
